import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.route("/")
    .post(verifyJWT, addToCart)
    .get(verifyJWT, getCart)
    .patch(verifyJWT, updateCartItem)
    .delete(verifyJWT, clearCart);

cartRouter.route("/:productId")
    .delete(verifyJWT, removeCartItem);

export { cartRouter };