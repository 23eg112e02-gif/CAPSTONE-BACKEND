import exp from 'express'
import {connect } from 'mongoose'
import {config} from 'dotenv'
import {userRoute} from './APIs/userApi.js'
import {authorRoute} from './APIs/authorApi.js'
import {adminRoute} from './APIs/adminApi.js'
import cookieParser from 'cookie-parser'
import { commonRouter } from './APIs/commonApi.js'
config()//process.env
const app=exp()

//add body parser middleware
app.use(exp.json())
//cookie parsing
app.use(cookieParser())
//connect to api
app.use('/user-api',userRoute)
app.use('/author-api',authorRoute)
app.use('/admin-api',adminRoute)
app.use('/common-api',commonRouter)

//connect to db
const connectDB=async()=>{
    try{
    await connect(process.env.DB_URL)
    console.log("DB connection succes")
    //stsrt http server
    app.listen(process.env.PORT,()=>console.log("server started"))
    }
    catch(err){
        console.log("err in DB connection",err)
    }

}
connectDB()
// app.post('/logout',(req,res)=>{
//     //clear the cookie named token
//     res.clearCookie('token',{
//         httpOnly:true,
//         secure:false,
//         sameSite:'lax'
//     })
//     res.status(200).json({message:'logged out successfuly'})
// })

// dealimg with invalid path
app.use((req,res,next)=>{
    res.json({message: `${req.url} Is Invalid Path`})
})

//error handler middleware
app.use((err,req,res,next)=>{
console.log("err:",err)
res.json({message:"eroor occured",reason:err.message})
})