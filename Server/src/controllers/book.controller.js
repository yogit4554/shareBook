import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {Book} from "../models/book.model.js"

const getBooks = asyncHandler(async(req,res)=>{
    try {
        const allBooks= await Book.find({});
        console.log(allBooks);

        if(!allBooks){
            throw new ApiError(401,"Error while getting all books");
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200,allBooks,"Successfully fetched all books.")
        )

    } catch (error) {
        throw new ApiError(500,error.message);
    }
})

export {
    getBooks
}