
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const auth=async(req,res,next)=>{
        const token=req.cookies.accesstoken;
        //console.log("Token in auth middleware:", token);
        if(!token){
          return res.status(401).json({message:"Unauthorized"})
        }
        try {
      const decoded=jwt.verify(token,process.env.access_secret);
      const user=await User.findById(decoded.userid).select("-password");
      req.user=user;
      next();
    } catch (error) {
        return res.status(401).json({message:error.message})
    }
}