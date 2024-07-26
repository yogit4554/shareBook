import mongoose,{Schema} from "mongoose";

const orderSchema = new Schema({
    books:{
        type:[Schema.Types.ObjectId],
        ref:"Book",
        required:true
    },
    payment_status:{
        type:String,
        enum:['pending', 'success', 'failure'],
        default:'pending'
    },
    transaction_id:{
        type:String
    },
    razorpay_order_id:{
        type:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:"true"
    },
    total:{
        type:String
    },
    quantity: {
        type:String
    }
},{timestamps:true})

export const Order=mongoose.model("Order",orderSchema);