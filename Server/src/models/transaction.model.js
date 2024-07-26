import mongoose,{Schema} from "mongoose";

const transactionSchema=new Schema({
    transactionId:{
        type:String
    },
    transactionAmount:{
        type:String
    }
},{timestamps:true})

export const Transaction = mongoose.model("Transaction",transactionSchema);