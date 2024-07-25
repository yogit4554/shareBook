import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {User} from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password,userType}=req.body;
    console.log(req.body);
    const secretpassword=bcrypt.hashSync(password,10); // password encryption 
    console.log(secretpassword);
    try {
        const user=await User.create({
            name,
            email,
            password: secretpassword,
            userType}
        )
        console.log(user);

        if(!user){
            throw new ApiError(400,"Error while creating new user!!");
        }

        return res
        .status(201)
        .json(new ApiResponse(200,user,"User  Registered Successfully!!"))

    } catch (error) {
        throw new ApiError(500,error.message);
    }
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    if(!email && !password){
        throw new ApiError(400,"User or email is required!!");
    }

    try {
        const user= await User.findOne({email});

        if(!user){
            throw new ApiError(400,"Incorrect email id!!")
        }

        const isPasswordValid =await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            throw new ApiError(400,"Wrong Password!!");
        }

        const token = jwt.sign(
            {
                userId:user._id,
                email:email
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY
            }
        )

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user:user.name,
                    token
                },
                "User logged In successfully!!"
            )
        )

    } catch (error) {
        throw new ApiError(400,error.message);
    }

})

const userFindOne = asyncHandler(async(req,res)=>{
    try {
        const userData = await User.findOne({_id:req.userId});
        if(!userData){
            throw new ApiError(400,"User does not exist");
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200,userData,"User fetched successfully!!")
        )
    } catch (error) {
        throw new ApiError(500,error.message);
    }
})

const userUpdate = asyncHandler(async(req,res)=>{
    const body = req.body
    console.log(body)
    const reqData = {
        name:body.name,
        email:body.email,
        languages:body.language,
        age:body.age,
        mobileNo:body.mobileNo,
        address:body.address,
        city:body.city
    }

    try {
        const updatedUser = await User.findOneAndUpdate({_id:req.userId},reqData); 

        if(!updatedUser){
            throw new ApiError(500,"Error while updating user.")
        }
        
        return res
        .status(200)
        .json(
            new ApiResponse(200,updatedUser,"User has been updated!!")
        )

    } catch (error) {
        throw new ApiResponse(400,error.message);
    }
})

export {
    registerUser,
    loginUser,
    userFindOne,
    userUpdate
}