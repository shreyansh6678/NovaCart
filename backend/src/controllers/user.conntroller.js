import { User } from "../models/user.model.js"
import { errorResponse, successResponse } from "../utils/response.js"

successResponse

const generateAccessAndRefreshToken=async(userId)=>{
    try {
        const user=await User.findById(userId);
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()
    
        user.refreshToken=refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        console.log("Error while generating access and refresh token",error)
    }
}
const registerUser=async(req,res)=>{
    try {
        const {fullName,email,password}=req.body
        if([fullName,email,password].some((field)=>!field || field.trim()==="")){
            return errorResponse(res,400,"All fields are required")
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return errorResponse(res, 400, "Invalid email format");
            } 
        const existingUser= await User.findOne({email:email.toLowerCase().trim()})
        if(existingUser){
            return errorResponse(res,409,"Email already registered")
        }
        const user=await User.create({
            fullName,
            email:email.toLowerCase().trim(),
            password
        })
        const createdUser=await User.findById(user._id).select("-password -refreshToken")
        if (!createdUser) {
        return errorResponse(res,500,"Something went wrong")
    }
    
        return successResponse(res,201,"User Created Successfully",createdUser)
    } catch (error) {
        console.error(error)
        return errorResponse(
    res,
    500,
    "Internal Server Error"
)
    }

}
const loginUser=async(req,res)=>{
    const {email,password}=req.body
    if(!email|| !password){
        return errorResponse(res,400,"email and password is required")
    }
    const user=await User.findOne({email}).select("+password")
    if(!user){
        return errorResponse(res,404,"User doesn't exist")
    }
    const isPasswordValid=await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        return errorResponse(res,401,"Password is incorrect")
    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)
    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")
    const options={
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:process.env.NODE_ENV==="production"?"None":"Lax"
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json({user:loggedInUser,message:"User login successfully"})

}
const logoutUser=async(req,res)=>{
     try{
        await User.findByIdAndUpdate(req.user?._id,{
            $unset:{
                refreshToken:1
            }
        })
        const options={
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:process.env.NODE_ENV==="production"?"None":"Lax"
        }
        return res
        .status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json({message:"User logout successfully"})
     }catch(error){
        console.error(error)
        return errorResponse(res,400,"Error while logging out user")
     }
}
const getCurrentUser=async(req,res)=>{
    return successResponse(res,200,"current user",req.user)
}
const updateAccountDetails = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    if (!fullName?.trim() || !email?.trim()) {
      return errorResponse(res, 400, "Full name and username are required");
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    user.fullName = fullName.trim();
    user.email = email.trim();

    await user.save();

    return successResponse(
      res,
      200,
      "Account updated successfully",
      user
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal Server Error");
  }
};
const changeCurrentPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return errorResponse(
        res,
        400,
        "Old password and new password are required"
      );
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
      return errorResponse(res, 400, "Old password is incorrect");
    }

    user.password = newPassword;

    await user.save();

    return successResponse(
      res,
      200,
      "Password changed successfully"
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, 500, "Internal Server Error");
  }
};
export {registerUser,loginUser,logoutUser,getCurrentUser,updateAccountDetails,changeCurrentPassword}