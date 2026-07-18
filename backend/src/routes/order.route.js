import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";

import {
    placeOrder,
    getMyOrders,
    getOrderById,
    cancelOrder,
    getAllOrders,
    updateOrderStatus
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/", verifyJWT, placeOrder);

orderRouter.get("/", verifyJWT, getMyOrders);

orderRouter.get("/all", verifyJWT, verifyAdmin, getAllOrders);

orderRouter.get("/:orderId", verifyJWT, getOrderById);

orderRouter.patch("/:orderId/cancel", verifyJWT, cancelOrder);


orderRouter.patch(
    "/:orderId/status",
    verifyJWT,
    verifyAdmin,
    updateOrderStatus
);

export { orderRouter };