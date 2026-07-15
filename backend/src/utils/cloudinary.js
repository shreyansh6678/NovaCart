import { v2 as cloudinary } from 'cloudinary';
import fs  from 'fs';


 cloudinary.config({ 
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET
    });
const uploadOnCloudinary=async(localFilePath)=>{
   try {
    const response= await cloudinary.uploader.upload(localFilePath,{
     resource_type:"auto"
    })
    fs.unlinkSync(localFilePath)
    return response
   } catch (error) {
       fs.unlinkSync(localFilePath)
    console.log("Error while uploading file on cloudinary",error)
   }
}
const deleteFromCloudinary=async(publicId)=>{
   try {
     if(!publicId)return
     const response=await cloudinary.uploader.destroy(publicId);
      return response
   } catch (error) {
    console.log("something went wrong while deleting Image",error)
   }
}
export{uploadOnCloudinary,deleteFromCloudinary}