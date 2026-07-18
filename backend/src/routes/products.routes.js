import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct, premiumProducts } from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.js";


const productRouter=Router()

productRouter.route("/")
.post(verifyJWT,verifyAdmin,upload.array("images",5),addProduct)
.get(getAllProducts)
productRouter.route("/premium").get(premiumProducts)

productRouter.route("/:productId")
.get(getProductById)
.patch(verifyJWT,verifyAdmin,upload.array("images",5),updateProduct)
.delete(verifyJWT,verifyAdmin,deleteProduct)

export {productRouter}