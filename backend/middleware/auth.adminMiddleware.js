
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const adminauth=async(req,res,next)=>{
        const token=req.cookies.accesstoken;
        if(!token){
          return res.status(401).json({message:"Unauthorized"})
        }
    try {
      const decoded=jwt.verify(token,process.env.access_secret);
      const user=await User.findById(decoded.userid).select("-password");

      if(!user || user.role !== 'admin') {
        return res.status(403).json({message:"Forbidden: Admins only"});
      }

      
      req.user=user;
      next();
    } catch (error) {
        return res.status(401).json({message:"Invalid or expired token"})
    }
};

