import { Router } from "express";
import { registerUser } from "../controllers/user.conntroller.js";

const userRouter=Router()

userRouter.route("/").post(registerUser)


export {userRouter}