import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { Book } from './models/book.model.js';
import seedBook from "./seedDb.js";
import { ApiError } from './utils/apiError.js';
import { ApiResponse } from './utils/apiResponse.js';

const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(cookieParser())
app.post('/seedDb',async(req,res)=>{
    for(let i = 0; i < seedBook.length; i++) {
        const res = await Book.create(seedBook[i]);
        if(!res){
            throw new ApiError(400,"Bad request");
        }
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,"databases seded successfully!!!")
    )
})

/// routes 
import userRouter from "./routes/user.routes.js"
import bookRouter from "./routes/book.routes.js"
import orderRouter from "./routes/order.routes.js"
 
// routes decleration 
app.use("/api/v1/users",userRouter);
app.use("/api/v1/books",bookRouter);
app.use("/api/v1/order",orderRouter);


export {app};