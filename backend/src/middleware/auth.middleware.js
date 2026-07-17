import { User } from "../models/user.model.js"
import { errorResponse } from "../utils/response.js"
import jwt from "jsonwebtoken"

const verifyJWT=async(req,res,next)=>{
    try{
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if(!token){
            return errorResponse(res,401,"Unauthorized access")
        }
        const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user){
            return errorResponse(res,401,"Invalid AccessToken")
        }
        req.user=user
        next()
    }catch(error){
        console.error(error)
        return errorResponse(res,401,"Invalid or expired token")
    }

}
export {verifyJWT}