import { Wishlist } from "../models/wishlist.model.js";
import { Product } from "../models/product.model.js";
import { errorResponse, successResponse } from "../utils/response.js";

const addToWishlist = async (req, res) => {
    try {
        const {productId}=req.body;
        if(!productId){
            return errorResponse(res,400,"ProductId is required")
        }
        const product=await Product.findById(productId)
        if(!product){
            return errorResponse(res,404,"Product not found")
        }
        let wishlist=await Wishlist.findOne({user:req.user._id})
        if(!wishlist){
            wishlist=await Wishlist.create({
                user:req.user._id,
                products:[productId]
            })
            return successResponse(res,201,"Product added to wishlist",wishlist)
        }
        const alreadyExists=wishlist.product.some((item)=>item.toString()===productId)
        if(alreadyExists){
            return errorResponse(res,400,"Product already exists in wishlist")
        }
        wishlist.products.push(productId)
        await wishlist.save()
        return successResponse(res,201,"Product added to wishlist",wishlist)
    } catch (error) {
        console.error(error)
        return errorResponse(res,500,"Internal server error")
    }
};

const getWishlist = async (req, res) => {
    try {
       const wishlist=await Wishlist.findOne({user:req.user._id}).populate({path:"products",select:"title price images stock brand"})
       if(!wishlist){
        return successResponse(res,200,"Wishlist is empty",{products:[]})
       }
       return successResponse(res,200,"Wishlist fetch successfully")
    } catch (error) {
        console.error(error)
        return errorResponse(res,500,"Internal server error")
    }
};

const removeFromWishlist = async (req, res) => {
    try {
        const {productId}=req.params
        const wishlist=await Wishlist.findOne({user:req.user._id})
        if(!wishlist){
            return errorResponse(res,404,"Prod")
        }
        const productExist=wishlist.products.some((product)=>product.toString()===productId)
        if(!productExist){
            return errorResponse(res,400,"Product not found in wishlist")
        }
        wishlist.products=wishlist.products.filter((product)=>product.toString()!==productId)
        await wishlist.save()
        return successResponse(res,200,"Product removed from wishlist",wishlist)
    } catch (error) {
        console.error(error)
        return errorResponse(res,500,"Internal server error")
    }
};

export {
    addToWishlist,
    getWishlist,
    removeFromWishlist
};