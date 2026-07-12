

const successResponse=function(res,statusCode,data,message){
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