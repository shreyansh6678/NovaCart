import { errorResponse } from "../utils/response.js"


const verifyAdmin= function(req,res,next){
  try{
     if(req.user.role!=="admin"){
        return errorResponse(res,403,"You are authenticated, but you don't have permission")
     } 
     next()

  }catch(error){
    console.log(error)
    return errorResponse(res,500,"Internal server error")
  }
}
export {verifyAdmin}