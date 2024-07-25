import 'dotenv/config'
import {app} from "./app.js"
import {connectDB} from "./db/index.js"


connectDB() // only code to connect the db
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port: ${process.env.PORT}`)
    });
})
.catch((err)=>{
    console.log("MONGO DB connection failed!!",err)
})