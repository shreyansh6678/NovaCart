

const successResponse=function(res,statusCode,message,data){
    return res
    .status(statusCode)
    .json({status:"success",message,data})
}
const errorResponse=function(res,statusCode,message){
    return res
    .status(statusCode)
    .json({status:"error",message})
}

export {successResponse,errorResponse}