import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=mongoose.Schema({
   fullName:{
    type:String,
    required:true,
    trim:true
   },
   email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
   },
   password:{
    type:String,
    required:true,
    select:false
   },
   avatar:{
    type:String
   },
   role:{
    type:String,
    enum:["user","admin"],
    default:"user"
   },
   refreshToken:{
    type:String
   }
},{timestamps:true})

userSchema.pre("save",async function(){
    if(!this.isModified(password))return
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            id:this._id,
            fullname:this.fullname,
            email:this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User=mongoose.model("User",userSchema)