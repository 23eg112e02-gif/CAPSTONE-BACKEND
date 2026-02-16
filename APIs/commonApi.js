import exp from 'express'
import { authenticate } from '../services/authService.js'
export const commonRouter=exp.Router()

//login
commonRouter.post('/login',async(req,res)=>{
    let userCred=req.body
    //call authentication 
    let {token,user}=await authenticate(userCred)
    //save token as httponly
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"lax",
        secure:false,
})
   //send res
   res.status(200).json({message:'login success'})
})
//logout
commonRouter.get('/logout',async(req,res)=>{
    res.clearCookie('token',{
        httpOnly:true,
        secure:false,
        sameSite:'lax'
    })
    res.status(200).json({message:'logged out successfuly'})
})
//change password
commonRouter.put('/change-password',async(req,res)=>{
    //get the current password and new password
    
    //
    //
})