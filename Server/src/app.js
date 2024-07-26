import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(cookieParser())

/// routes 
import userRouter from "./routes/user.routes.js"
import bookRouter from "./routes/book.routes.js"
 
// routes decleration 
app.use("/api/v1/users",userRouter);
app.use("/api/v1/books",bookRouter);


export {app};