import { userModel } from "../models/userModel.js";

export const checkAdmin = async (req, res, next) => {
  //get author id
  let {aid}=req.params
  //verify author
  let user = await userModel.findById(aid);
  //if author found but role is different
  if(user.role!=='ADMIN'){
    return res.status(403).json({ message: "not an admin" });
  }
  
  //forward req to next
  next();
};