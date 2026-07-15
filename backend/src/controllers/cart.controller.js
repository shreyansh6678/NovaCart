import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { errorResponse, successResponse } from "../utils/response.js";

const addToCart = async (req, res) => {
    try {
        const {productId,quantity=1}=req.body
        if((!productId)){
            return errorResponse(res, 400, "Product is required");
        }
        if(quantity<=0){
            return  errorResponse(res,400,"Quantity must be greater than 0")
        }
        const product=await Product.findById(productId)
        if(!product){
            return errorResponse(res, 404, "Product doesn't exist");
        }
        if(product.stock<quantity){
            return errorResponse( res,
                400,
                `Only ${product.stock} items are available`)
        }
        let cart=await Cart.findOne({user:req.user._id})
        if(!cart){
            cart=await Cart.create({
                user:req.user._id,
                items:[{
                    products:productId,
                    quantity
                }
                ]
            })
            return successResponse(res,201,"Product added to Cart",cart)
        }
     const existingItem= cart.items.find((item)=>item.product.toString()===productId)
     if(existingItem){
        existingItem.quantity+=quantity
     }
     else{
        cart.items.push({
            product:productId,
            quantity
        })
     }
     await cart.save()
     return successResponse(res,201,"Product added to Cart",cart)
    } catch (error) {
        console.error(error);
        return errorResponse(res, 500, "Internal Server Error");
    }
};

const getCart = async (req, res) => {
    try {
        const cart=await Cart.findOne({user:req.user._id}).populate({path:"items.product",select:"title prices images stock "})
        if(!cart){
            return successResponse(res,200,"Cart is empty",{items:[]})
        }
        return successResponse(res,200,"Cart fetched successfully",cart)
    } catch (error) {
        console.error(error);
        return errorResponse(res, 500, "Internal Server Error");
    }
};

const updateCartItem = async (req, res) => {
    try {
         const {productId,quantity}=req.body
         if(!productId || quantity==null){
            return errorResponse(res,400,"Product and quantity is required")
         }
          if (quantity <= 0) {
            return errorResponse(res, 400, "Quantity must be greater than 0");
        }
         const product = await Product.findById(productId);
         
        if (!product) {
            return errorResponse(res, 404, "Product doesn't exist");
        }

        if (quantity > product.stock) {
            return errorResponse(
                res,
                400,
                `Only ${product.stock} items are available`
            );
        }
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return errorResponse(res, 404, "Cart not found");
        }

        const item = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (!item) {
            return errorResponse(res, 404, "Product not found in cart");
        }
        item.quantity=quantity
        await cart.save()
         return successResponse(
            res,
            200,
            "Cart updated successfully",
            cart
        );
    } catch (error) {
        console.error(error);
        return errorResponse(res, 500, "Internal Server Error");
    }
};

const removeCartItem = async (req, res) => {
    try {
      const {productId}=req.params
          
      const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return errorResponse(res, 404, "Cart not found");
        }
        const itemExists=cart.items.some(item => item.product.toString() === productId)
        if (!itemExists) {
            return errorResponse(
                res,
                404,
                "Product not found in cart"
            );
        }
         cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();
        return successResponse(
            res,
            200,
            "Product removed from cart",
            cart
        );
    } catch (error) {
        console.error(error);
        return errorResponse(res, 500, "Internal Server Error");
    }
};

const clearCart = async (req, res) => {
    try {
   const cart = await Cart.findOne({
            user: req.user._id
        });

        if (!cart) {
            return errorResponse(
                res,
                404,
                "Cart not found"
            );
        }

        cart.items = [];

        await cart.save();

        return successResponse(
            res,
            200,
            "Cart cleared successfully",
            cart
        );
    } catch (error) {
        console.error(error);
        return errorResponse(res, 500, "Internal Server Error");
    }
};

export {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart
};