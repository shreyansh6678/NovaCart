import mongoose from "mongoose";

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim: true
    },
    image:{
        type:String,
    }},{timestamps:true})

export const Category=mongoose.model("Category",categorySchema)