import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import Task from "../models/task.model.js";
import dotenv from "dotenv"
dotenv.config()
const generatetoken=async(userid)=>{
    const accesstoken=jwt.sign({userid},process.env.access_secret,{expiresIn:"1d"});
    return accesstoken;
}
const setCookies=async(res,accesstoken)=>{
    res.cookie("accesstoken",accesstoken,{
        httpOnly:true,// prevent xss attack 
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",//prevents CSRF attack request forgery attack
        maxAge:24*60*60*1000
    
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
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Enter all fields");
    }

    // ⚠️ MUST select password explicitly
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Signup first" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password incorrect" });
    }

    const accesstoken = await generatetoken(user._id);
    setCookies(res, accesstoken);

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Task.find({ assignedTo: id });
        res.status(200).json({ task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
  
const changeStatus = async(req,res) => {
  const id = req.params.id;
  const {status} = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, {status}, {new: true});
    res.status(200).json({message: "Task Updated", user});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email role");

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




const profile=async(req,res)=>{
  const user=req.user
  try {
    res.json(user)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}

const getalluser=async(req,res)=>{
    try {
        const users=await User.find();      
        res.status(200).json({users});
    }

    catch (error) {
        res.status(500).json({message:error.message})   

    }
}   

const logout = async (req, res) => {
  try {
    res.clearCookie("accesstoken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};


export {Signup,Login, getTask, profile ,getAllTasks ,getalluser, logout, changeStatus};
