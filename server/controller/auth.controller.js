import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login=async(req,res)=>{
  
   try {
    const{email,password}=req.body;
    console.log(email,password);
    
    const user=await User.findOne({email});
    if(!email){
     return res.status(400).json({success:false,error:"user not found"});
    } 
    const hashedPassword=await bcrypt.compare(password,user.password);
    if(!hashedPassword){
     return res.status(400).json({success:false,error:"Wrong Password"});
    }
    const token=jwt.sign({_id:user._id,role:user._id},process.env.JWT_KEY,{expiresIn:"10d"});
    return res.status(200).json({success:true,token,user:{_id:user._id,name:user.name,role:user.role}})
   } catch (error) {
    console.log(error.message);
    res.status(500).json({success:false,error:error.message})
   }
}

export const verify=async(req,res,next)=>{
   return res.status(200).json({success:true,user:req.user}) 
}