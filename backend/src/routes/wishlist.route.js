import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlist.controller.js";

const wishlistRouter=Router()

wishlistRouter.route("/")
.post(verifyJWT,addToWishlist)
.get(verifyJWT,getWishlist)

wishlistRouter.route("/:productId")
.delete(verifyJWT,removeFromWishlist)

export {wishlistRouter}