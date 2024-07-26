import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {Transaction} from "../models/transaction.model.js"
import { razorpayConfig } from "../constant.js"
import RazorPay from "razorpay"
import crypto from "crypto";

const instance = new RazorPay(razorpayConfig)

const createPayment = asyncHandler(async(req,res)=>{
    const options={
        amount: req.body.amount,
        currency: "INR",
        receipt: `order_rcptid_${Date.now()}`,
    }

    instance.orders.create(options, (err, order)=>{
        if(err){
            throw new ApiError(400,err.message);
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200,order,"Order has been creater")
        )
    })
});

const verifyPayment = asyncHandler(async(req,res)=>{
    const generated_signature = crypto.createHmac('sha256',razorpayConfig.key_secret)
    generated_signature.update(req.body.razorpay_order_id+"|"+ req.body.transactionid)
    
    if ( generated_signature.digest('hex') === req.body.razorpay_signature){
            const transaction = new Transaction({
                transactionid:req.body.transactionid,
                transactionamount:req.body.transactionamount,
            });
            transaction.save(function(err, savedtransac){
                if(err){
                    console.log(err);
                    return res.status(500).send("Some Problem Occured");
                }
                res.send({transaction: savedtransac});
            });
    }
    else{
        return res.send('failed');
    }
})



export {
    createPayment,
    verifyPayment
}