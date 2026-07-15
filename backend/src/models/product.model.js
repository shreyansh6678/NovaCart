import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true
    },
    description:{
        type:String,
        required:true,
        trim: true
    },
    price:{
        type:Number,
        required:true,
        min: [0, "Price cannot be negative"]
    },
    discount:{
        type:Number,
        required:true,
        default: 0,
        min: 0,
        max: 100
    },
    stock:{
        type:Number,
        required:true,
        min:0,
        default:0
    },
        images:[{

           url:{
                type:String,
                required:true
            },
           public_id:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    brand:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})

export const Product=mongoose.model("Product",productSchema)