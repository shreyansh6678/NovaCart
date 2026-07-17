import { Cart } from "../models/cart.model.js";
import { errorResponse, successResponse } from "../utils/response.js";
import {Order} from "../models/order.model.js"


const placeOrder = async (req, res) => {
    try {

        const { shippingAddress, paymentMethod } = req.body;

        if (!shippingAddress?.trim()) {
            return errorResponse(res, 400, "Shipping address is required");
        }

        const cart = await Cart.findOne({
            user: req.user._id
        }).populate({
            path: "items.product"
        });

        if (!cart || cart.items.length === 0) {
            return errorResponse(res, 400, "Cart is empty");
        }

        let totalAmount = 0;
        const orderItems = [];

        for (const item of cart.items) {

            const product = item.product;

            if (!product) {
                return errorResponse(res, 404, "Product not found");
            }

            if (product.stock < item.quantity) {
                return errorResponse(
                    res,
                    400,
                    `${product.title} is out of stock`
                );
            }

            totalAmount += product.price * item.quantity;

            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });

            product.stock -= item.quantity;
            await product.save();
        }

        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            totalAmount,
            shippingAddress: shippingAddress.trim(),
            paymentMethod: paymentMethod || "COD"
        });
        cart.items = [];
        await cart.save();

        return successResponse(
            res,
            201,
            "Order placed successfully",
            order
        );

    } catch (error) {

        console.error(error);

        return errorResponse(
            res,
            500,
            "Internal Server Error"
        );

    }
};
const getMyOrders=async(req,res)=>{
    try {
         const orders = await Order.find({
            user: req.user._id
        })
        .populate({
            path: "items.product",
            select: "title price discount images"
        })
        .sort({ createdAt: -1 });

        return successResponse(
            res,
            200,
            "Orders fetched successfully",
            orders
        );

    } catch (error) {
        console.error(error)
        return errorResponse(res,500,"Internal server error")
    }
}
const getOrderById=async(req,res)=>{
try {
    const {orderId}=req.params
    const order=await Order.findById(orderId).populate({path:"items.product",select:"title price images"}).populate({path:"user",select:"fullName email"})
    if(!order){
        return errorResponse(res,404,"Order not found")
    }
    if(order.user._id.toString()!==req.user._id.toString()&&req.user.role!=="admin"){
        return errorResponse(res,403,"Unauthorized access")
    }
     return successResponse(
            res,
            200,
            "Order fetched successfully",
            order
        );
} catch (error) {
    console.error(error)
    return errorResponse(res,500,"Internal server error")
}
}
const cancelOrder=async(req,res)=>{
try {
    const {orderId}=req.params
    const order=await Order.findById(orderId)
    if(!order){
        return errorResponse(res,404,"Order not found")
    }
    if(order.user._id.toString()!==req.user._id.toString()&&req.user.role!=="admin"){
        return errorResponse(res,403,"Unauthorized access")
    }
    if(order.orderStatus==="Cancelled"){
        return errorResponse(res,400,"Order is already Cancelled")
    }
    if(order.orderStatus==="Delivered"){
        return errorResponse(res,400,"Delivered order cannot be cancelled")
    }
    order.status="Cancelled"
    await order.save()
    return successResponse(
            res,
            200,
            "Order cancelled successfully",
            order
        );

} catch (error) {
    console.error(error)
    return errorResponse(res,500,"Internal server error")
}
}
const getAllOrders=async(req,res)=>{
try {
         const orders = await Order.find()
         .populate({
            path:"user",
            select:"fullName email"
         })
        .populate({
            path: "items.product",
            select: "title price images"
        })
        .sort({ createdAt: -1 });

        return successResponse(
            res,
            200,
            "Orders fetched successfully",
            orders
        );

} catch (error) {
    console.error(error)
    return errorResponse(res,500,"Internal server error")
}
}
const updateOrderStatus=async(req,res)=>{
try {
    const {orderId}=req.params
    const {orderStatus}=req.body
    const order=await Order.findById(orderId)
    if(!order){
        return errorResponse(res,404,"Order not found")
    }
    const validStatus=[
        "Pending",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled"
    ]
    if(!validStatus.includes(orderStatus)){
        return errorResponse(res,400,"Invalid order Status")
    }
    order.orderStatus=orderStatus
    await order.save()
    return successResponse(
            res,
            200,
            "Order status updated successfully",
            order
        );
} catch (error) {
    console.error(error)
    return errorResponse(res,500,"Internal server error")
}
}
export {placeOrder,getMyOrders,getOrderById,cancelOrder,getAllOrders,updateOrderStatus}