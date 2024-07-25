import {userType} from "../constant.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"


const userBodyDataFilter = asyncHandler(async(req,res,next)=>{
    const body = req.body;

    if(!body.name || !body.email || !body.password || !body.userType){
        throw new ApiError(401,"All filed is required check name , email, password, userType");
    }

    if(!userType[body.userType.toUpperCase()]){
        throw new ApiError(401,"usertype must be capital");
    }else{
        req.body.userType = body.userType.toUpperCase()
    }
    next();
})

const loginBodyDatafilter=asyncHandler(async(req,res,next)=>{
    const body=req.body;

    if(!body.email || !body.password){
        throw new ApiError(401,"email and password required!!");
    }

    next();
})

export{
    userBodyDataFilter,
    loginBodyDatafilter
}