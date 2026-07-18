import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";
import { getDashboardStats } from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.get(
  "/dashboard",
  verifyJWT,
  verifyAdmin,
  getDashboardStats
);


export default adminRouter;