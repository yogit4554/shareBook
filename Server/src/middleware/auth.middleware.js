import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js";
import {User} from "../models/user.model.js"

export const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer","")
        if(!token){
            throw new ApiError (401,"token not getting");
        }
    
        const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?.userId).select("-password")
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
    
        req.user=user;
        next();
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access  token")
    }
    
})