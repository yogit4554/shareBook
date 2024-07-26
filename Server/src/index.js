import 'dotenv/config'
import {app} from "./app.js"
import {connectDB} from "./db/index.js"
import { Book } from './models/book.model.js';
import seedBook from "./seedDb.js";
import { ApiError } from './utils/apiError.js';
import { ApiResponse } from './utils/apiResponse.js';

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

connectDB() // only code to connect the db
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port: ${process.env.PORT}`)
    });
})
.catch((err)=>{
    console.log("MONGO DB connection failed!!",err)
})