import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { userRouter } from "./routes/user.route.js"
import dotenv from "dotenv"
import { categoryRouter } from "./routes/category.routes.js"
import { productRouter } from "./routes/products.routes.js"
import { cartRouter } from "./routes/cart.routes.js"
import { orderRouter } from "./routes/order.route.js"
import { wishlistRouter } from "./routes/wishlist.route.js"
import adminRouter from "./routes/admin.route.js"

dotenv.config({path:"./.env"})

const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(cookieParser())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))



app.use("/users",userRouter)
app.use("/categories",categoryRouter)
app.use("/products",productRouter)
app.use("/cart",cartRouter)
app.use("/orders",orderRouter)
app.use("/wishlist",wishlistRouter)
app.use("/admin", adminRouter); 

export {app}