let DB_NAME = "shareBook"

const userType = {
    ADMIN:'ADMIN',
    CUSTOMER:'CUSTOMER',
    SELLER:'SELLER'
}

const razorpayConfig={
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
}

export {
    DB_NAME,
    userType,
    razorpayConfig
}