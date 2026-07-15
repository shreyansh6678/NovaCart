import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";
import { addCategory, deleteCategory, getAllCategory, updateCategory } from "../controllers/category.controller.js";

const categoryRouter=Router()

categoryRouter.route("/").post(verifyJWT,verifyAdmin,addCategory)
categoryRouter.route("/").get(getAllCategory)
categoryRouter.route("/:categoryId").patch(verifyJWT,verifyAdmin,updateCategory)
categoryRouter.route("/:categoryId").delete(verifyJWT,verifyAdmin,deleteCategory)

export {categoryRouter}