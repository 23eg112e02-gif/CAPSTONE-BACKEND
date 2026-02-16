import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()
export const  verifyToken=async(req,resizeBy,next)=>{
    //read token from req
    let token=req.cookies.token
    if(token==undefined){
        return res.status(400).json({message:"unauthorized req please login"})
    }

    //verify the validity of token(decode token)
    let decodedToken=jwt.verify(token, process.env.JWT_SECRET)
    //forward req to next middleware or route
    next()
}