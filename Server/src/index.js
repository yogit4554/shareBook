import 'dotenv/config'
import {app} from "./app.js"
import {connectDB} from "./db/index.js"
import cors from "cors"

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(cookieParser())

connectDB() // only code to connect the db
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port: ${process.env.PORT}`)
    });
})
.catch((err)=>{
    console.log("MONGO DB connection failed!!",err)
})