import { Category } from "../models/category.model.js"
import { errorResponse, successResponse } from "../utils/response.js"


const addCategory=async(req,res)=>{
    try{
        const {name,description}=req.body
        if([name,description].some((field)=>!field || field.trim()==="")){
            return errorResponse(res,400,"All fields are required")
        }

        const normalizedName=name.trim().toLowerCase()

        const existingCategory=await Category.findOne({name:normalizedName})
        if(existingCategory){
            return errorResponse(res,409,"Category already exist")
        }

        const category=await Category.create({
            name:normalizedName,
            description:description.trim()
        })
        const createdCategory=await Category.findById(category._id)
        return successResponse(res,201,"Category created successfully",createdCategory)

    }
    catch(error){
        console.error(error)
        return errorResponse(res,500,"Internal Server Error")
    }
}

const getAllCategory=async(req,res)=>{
   try {
     const allCategory=await Category.find()
     return successResponse(res,200,"Fetched category successfully",allCategory)
   } catch (error) {
    console.error(error)
    return errorResponse(res,500,"Internal Server Error")
   }
}

const updateCategory=async(req,res)=>{
    try {
        const categoryId=req.params.categoryId
        const {name,description}=req.body
    
        if([name,description].some((field)=>!field||field.trim()==="")){
            return errorResponse(res,400,"All field are required")
        }
        const existingCategory=await Category.findById(categoryId)
            if(!existingCategory){
                return errorResponse(res,404,"Category doesn't exist")
            }
            const normalizedNewName=name.trim().toLowerCase()
            const duplicateCategory = await Category.findOne({
            name: normalizedNewName,
            _id: { $ne: categoryId }
        });

        if (duplicateCategory) {
            return errorResponse(res, 409, "Category already exists");
        }
            
            existingCategory.name = normalizedNewName;
        existingCategory.description = description.trim();
        await existingCategory.save()
         return successResponse(res,200,"Category Updated",existingCategory)
    } catch (error) {
        console.error(error)
        return errorResponse(res,500,"Something went wrong while updating")
    }
}

const deleteCategory=async (req,res)=>{
    try {
        const {categoryId}=req.params
    
        const categoryExist=await Category.findById(categoryId)
        if(!categoryExist){
            return errorResponse(res,404,"Category doesn't Exists")
        }
        const existingProduct = await Product.findOne({
  category: categoryId,
});

if (existingProduct) {
  return errorResponse(
    res,
    400,
    "Cannot delete category because products are using it."
  );
}
        await categoryExist.deleteOne()
        return successResponse(res,200,"Category deleted successfully",null)
    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Internal Server Error");
    }
}



export {addCategory,getAllCategory,updateCategory,deleteCategory}