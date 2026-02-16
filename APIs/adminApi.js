import exp from 'express'
import { authorRoute } from './authorApi.js'
import {verifyToken} from '../middllewares/verifiyToken.js'
import {userModel} from '../models/userModel.js'
import { checkAuthor } from '../middllewares/checkAuthor.js'
import { checkAdmin } from '../middllewares/checkAdmin.js'
export const adminRoute=exp.Router()
//read all articles
adminRoute.get('/read/:authId',verifyToken,async(req,res)=>{
    //get author id
    let authId=req.params.authorId
    //read the article
    let articles= await articleModel.find({author:authId,isSrticleActive:true}).populate("author","firstName email")
    //send res
    res.status(200).json({message:"Articles of author",payload:articles})
})
    
//block user
adminRoute.put('/block/:userId',verifyToken,checkAdmin,async(req,res)=>{
    let {userId} =req.params
     let updatedUser= await userModel.findByIdAndUpdate(userId,{
        $set:{isUserActive:false},
    },
        {new:true},
    )
    if(!updatedUser){
        return res.status(404).json({message:"User not found"})
    }
    res.json({message: "user blocked"})
})

//activate user
adminRoute.put('/active/:userId',verifyToken,checkAdmin,async(req,res)=>{
    let {userId}=req.params
     let updatedUser= await userModel.findByIdAndUpdate(userId,{
        $set:{isUserActive:true},
    },
        {new:true},
    )
    res.json({message:"user unblocked"})
})
