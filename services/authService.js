import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {userModel} from '../models/userModel.js'
import { config } from 'dotenv'
config()
//register function
export const register =async (userObj)=>{
    //create the document
    const userDoc = new userModel(userObj) 
    //validate for empty password
    await userDoc.validate()
    //hash the password and replace it with hashed password
    userDoc.password=await bcrypt.hash(userDoc.password,10)
    //save
    const created = await userDoc.save()
    //convert document to object to remove password
    const newUserobj = created.toObject()
    //remove password
    delete newUserobj.password
    //return user obj without password
    return newUserobj
}

export const authenticate = async ({email,password})=>{
    //check user with email & role
    const user = await userModel.findOne({email});
    if(!user){
        const err = new Error("Invalid email or role");
        err.status=401
        throw err
    }
    //compare passwords
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        const err = new Error("Invalid password")
        err.status=401
        throw err
    }
    if(user.isActive==false){
        const err= new Error("your account is blocked. plz contact admin")
        err.ststus=403
        throw err
    }
    // genetrate token
    const token = jwt.sign({userId: user._id,role:user.role,email:user.email},process.env.JWT_SECRET,{expiresIn:"1h"})
    const userObj = user.toObject()
    delete userObj.password
    return {token,user:userObj}
}