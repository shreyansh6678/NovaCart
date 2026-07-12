import mongoose from "mongoose"
import { DB_NAME } from "../utils/constant.js"


const connectDB=async ()=>{
     try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("MONGODB CONNECTED !!")
     } catch (error) {
        console.log("Error on connecting MONGODB",error)
     }
}
export {connectDB}