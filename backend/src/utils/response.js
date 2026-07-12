

const successResponse=function(res,statusCode,data,message){
    return res
    .status(statusCode)
    .json({data,message})
}
const errorResponse=function(res,statusCode,message){
    return res
    .status(statusCode)
    .json({message})
}

export {successResponse,errorResponse}