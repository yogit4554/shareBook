import mongoose,{Schema} from "mogoose"

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    userType:{
        type:String,
        required:true,
        enum:['CUSTOMER','ADMIN','SELLER']
    },
    language:{
        type:String,
        default:"Hindi"
    },
    age:{
        type:Number
    },
    mobileNo:{
        type:Number
    },
    address:{
        type:String
    },
    city:{
        type:String
    }
},{timestamps:true});



export const User = mongoose.model("User",userSchema);