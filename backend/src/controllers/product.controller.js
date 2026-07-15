import { Category } from "../models/category.model.js"
import { Product } from "../models/product.model.js"
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js"
import { errorResponse, successResponse } from "../utils/response.js"


const addProduct=async(req,res)=>{
    try {
        const {title,description,price,discount,stock,category,brand} = req.body
        if(!title.trim() || !description.trim()||price === undefined ||price===null ||stock===null||!category||!brand.trim()){
            return errorResponse(res,400,"All fields are required")
        }
        if(!req.files||req.files.length===0){
            return errorResponse(res,400,"atleast one image is required")
        }
        const existingCategory=await Category.findById(category)
        if(!existingCategory){
            return errorResponse(res,404,"Category doesn't exists")
        }
        const imageUrls=[]
        for (const file of req.files) {
            const response=await uploadOnCloudinary(file.path)
            if(response){
                imageUrls.push({url:response.secure_url,public_id:response.public_id})
            }
        }
        const product= await Product.create({
            title:title.trim(),
            description:description.trim(),
            price,
            discount,
            stock,
            images:imageUrls,
            category,
            brand:brand.trim()
        })
        return successResponse(res,201,"Product created successfully",product)
    } catch (error) {
        console.error(error)
        return errorResponse(res,500,"Internal server error")
    }
}
const getAllProducts=async(req,res)=>{
      try {
        const {search,category,minPrice,maxPrice,sort,page=1,limit=10}=req.query
        const filter={};
        const searchTerm=search?.trim()
        if(searchTerm){
            filter.$or=[
                {
                    title:{
                        $regex:searchTerm,
                        $options:"i"
                    }
                },
                {
                    brand:{
                        $regex:searchTerm,
                        $options:"i"
                    }
                },
                {
                    description:{
                        $regex:searchTerm,
                        $options:"i"
                    }
                }
            ]
        }
        if(category){
            filter.category=category
        }
        if(minPrice || maxPrice){
            filter.price={}
            if(minPrice){
                filter.price.$gte=Number(minPrice)
            }
            if(maxPrice){
                filter.price.$lte=Number(maxPrice)
            }
        }
        let sortOption={}
        if(sort==="priceAsc"){
            sortOption.price=1
        }
        else if(sort==="priceDesc"){
            sortOption.price=-1
        }
        else if(sort==="latest"){
            sortOption.createdAt = -1;
        }
        const pageNumber=Number(page)
        const limitNumber=Number(limit)
        const skip=(pageNumber-1)*limitNumber
        const products=await Product.find(filter).populate({path:"category",select:"name"}).sort(sortOption).skip(skip).limit(limitNumber)
        const totalProduct=await Product.countDocuments(filter)
        const totalPages=Math.ceil(totalProduct/limitNumber)
      return successResponse(res,200,"Fetched all products",{products,pagination:{
        page:pageNumber,
        limit:limitNumber,
        totalProduct,
        totalPages
      }})
      } catch (error) {
        console.error(error)
        return errorResponse(res,500,"Internal server error")
      }
    }    
const getProductById=async(req,res)=>{
    try {
         const {productId}=req.params
         const product=await Product.findById(productId).populate({path:"category",select:"name"})
         if(!product){
            return errorResponse(res,404,"Product doesn't exist")
         }
         return successResponse(res,200,"Fetched product by id",product)
    } catch (error) {
        console.error(error)
        return errorResponse(res,500,"Internal Server Error")
    }
}
const updateProduct=async(req,res)=>{
    try {
        const {productId}=req.params;
        const {title,description,price,discount,stock,category,brand}=req.body
        const product=await Product.findById(productId)
        if(!product){
            return errorResponse(res,404,"product doesn't exists")
        }
        if(!title.trim()||!description||price==null || price<=0||discount<0||stock===undefined||stock===null||stock<0||!category||!brand){
            return errorResponse(res,400,"all field are required")
        }
        const existingCategory=await Category.findById(category)
        if(!existingCategory){
            return errorResponse(res,404,"Category doesn't exists")
        }
        const imageUrls=[]
        if(req.files&&req.files.length>0){
            for (const image of product.images) {
                await deleteFromCloudinary(image.public_id)
            }
            for (const file of req.files) {
                const response=await uploadOnCloudinary(file.path)
                if(response){
                    imageUrls.push({url:response.secure_url,public_id:response.public_id})
                }
            }
            product.images=imageUrls
        }
        product.title=title.trim()
    product.description=description.trim()
    product.price=price
    product.discount=discount
    product.stock=stock
    product.category=category
    product.brand=brand.trim()
    await product.save()
    
    return successResponse(res,200,"Product updated",product)
    } catch (error) {
        console.error(error)
        return errorResponse(res,500,"Internal server error")
    }
}
const deleteProduct=async(req,res)=>{
   try {
     const {productId}=req.params
     const  product=await Product.findById(productId)
     if(!product){
         return errorResponse(res,404,"Product doesn't exist")
     }
     for (const image of product.images){
        await deleteFromCloudinary(image.public_id)
     }
     await product.deleteOne()
     return successResponse(res,200,"Product deleted",null)
   } catch (error) {
     console.error(error)
        return errorResponse(res,500,"Internal server error")
   }
}

export {addProduct,getAllProducts,getProductById,updateProduct,deleteProduct}


