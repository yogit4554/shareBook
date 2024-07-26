import mongoose,{Schema} from "mongoose";

const bookSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    coverPage:{
        type:String
    },
    category_id:{
        type:String
    }
},{timestamps:true});

export const Book= mongoose.model("Book",bookSchema);