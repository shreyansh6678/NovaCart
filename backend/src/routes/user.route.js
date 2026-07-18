import { Router } from "express";
import { registerUser,loginUser,logoutUser,getCurrentUser,updateAccountDetails,changeCurrentPassword,getAllUsers } from "../controllers/user.conntroller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";
const userRouter=Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/logout").post(verifyJWT,logoutUser)
userRouter.route("/current-user").get(verifyJWT,getCurrentUser)
userRouter.route("/update-account-details").patch(verifyJWT,updateAccountDetails);
userRouter.route("/change-password").patch(verifyJWT,changeCurrentPassword);
userRouter.get("/all",verifyJWT,verifyAdmin,getAllUsers);

export {userRouter}