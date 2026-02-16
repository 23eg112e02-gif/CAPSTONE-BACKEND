import exp from 'express'
import { authenticate, register } from '../services/authService.js' 
import { verifyToken } from '../middllewares/verifiyToken.js'
export const userRoute=exp.Router()
//register user
userRoute.post('/users',async(req,res)=>{
    //get user obj from req
    let userObj=req.body
    //call register
    const newUserobj = await register({...userObj,role:"USER"})
    //send res
    res.status(201).json({message:"user created",payload:newUserobj})
})
// //Authenticate user
// userRoute.post('/authenticate',async(req,res)=>{
// //get user cred from body
// let userCred=req.body
// //call authentication 
// let {token,user}=await authenticate(userCred)
// //save token as httponly
// res.cookie("token",token,{
//     httpOnly:true,
//     sameSite:"lax",
//     secure:false,
// })
// //send res
// res.status(200).json({message:"login success",payload:user})
// })

//view article(protected)
userRoute.get('/articles/:id',verifyToken, async (req, res) => {
         if (decoded.role !== "USER") {
            return res.status(403).json({ message: "Forbidden: Users only" })
        }
        const articleId = req.params.id
        const article = await article(articleId)
        res.status(200).json({ message: "article retrieved", payload: article })

})
1       
//write coments(protrcted)


