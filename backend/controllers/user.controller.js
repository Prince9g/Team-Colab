import User from "./models/user.model.js"
import jwt from "jsonwebtoken"

const generatetoken=async(userid)=>{
    const accesstoken=jwt.sign({userid},process.env.access_secret,{expiresIn:"1d"});
    return accesstoken;
}
const setCookies=async(res,accesstoken)=>{
    res.cookie("accesstoken",accesstoken,{
        httpOnly:true,// prevent xss attack 
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",//prevents CSRF attack request forgery attack
        maxAge:15*60*1000
    
    })
}
const Signup=async(req,res)=>{
    try {
        const {name,email,password,status,role}=req.body;
        if(!name||!email||!password||!status||!role){
            return res.status(400).json("Enter all fields");
        }
        const userexist=await User.findOne({email});
        if(userexist){
            return res.status(400).json({message:"User already exist"});
        }

        const user=await User.create({name,email,password,role,status});
        const accesstoken=await generatetoken(user._id);
        setCookies(res,accesstoken);
        return res.status(201).json({
            message:"User created successfully",
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                status:user.status
            }
        })

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
        
}

const Login=async(req,res)=>{
    try {
        const {email,password}=req.body;

        if(!email||!password){
            return res.status(400).json("Enter all fields");
        }
        const user=await User.findOne({email});

    if(!user){
        return res.status(400).json({message:"Signup first"});
    }
     
    const passwordcheck=await user.isconfirmpass(password);
    if(!passwordcheck){
        return res.status(400).json({message:"Password incorrect"});
    }
     const accesstoken=await generatetoken(user._id);
     setCookies(res,accesstoken);
    return res.status(200).json({
        message:"Login successfully",
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export {Signup,Login}