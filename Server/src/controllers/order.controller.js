import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {Order} from "../models/order.model.js"

const getOrderByUserId  = asyncHandler(async(req,res)=>{
    try {
        const orderData = await Order.find({user:req.userId});
        if(!orderData){
            throw new ApiError(404,"Order does not exist!!")
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200,orderData,"Order fetched successfully!!")
        )
    } catch (error) {
        throw new ApiError(500,"error while getting order by user id")
    }
})

const createOrder =  asyncHandler(async(req,res)=>{
    const body =req.body;
    const payment =JSON.parse(body.payment_details).values
    const total= (payment.transactionamount / 100 )||0
    const createOrderData={
        books:body.items,
        transaction_id:payment.transactionid,
        razorpay_order_id:payment.razorpay_order_id,
        payment_status:"success",
        user:req.userId,
        total:total,
        quantity:body.items.length
    } 

    try {
        const newOrder= await Order.create(createOrderData)
        if(!newOrder){
            throw new ApiError(500,"error while creating new order")
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200,newOrder,"Order has been created!!")
        )

    } catch (error) {
        throw new ApiError(500,"error while creating order!!")
    }

})

export {
    getOrderByUserId,
    createOrder
}