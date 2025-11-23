import bcrypt from "bcrypt"
import User from "../models/auth.models.js"
import jwt from "jsonwebtoken"

export const register=async(req,res)=>{

    const {name,email,password,role}=req.body
    
    
    if(!name || !email || !password ){
        return res.status(400).json({
            success:false,
            message:"All fields are required"})
    }
    try {
        const userExists=await User.findOne({email})
        if(userExists){
            return res.status(400).json({
                success:false,
                message:"User already exists"})
        }
        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salt)

       
        
        const user= await User.create({name,email,password:hashPassword,role})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not created"})
        }
         const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"none"})
        res.status(201).json({
            success:true,
            message:"User created successfully",
            User:{name:user.name,
            role:user.role,
            email:user.email
        }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,
            message:"Something went wrong"})  
        
    }

}
export const login=async(req,res)=>{

    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are required"})
    }
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"})
        }
        const isMatch= bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.cookie("token",token,{httpOnly:true,secure:true,sameSite:"none"})
        res.status(200).json({
            success:true,
            message:"User logged in successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,
            message:"Something went wrong"})  
        
    }

}
export const logout=async(req,res)=>{
    const token=req.cookies.token;
    console.log(token)
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorized"})
    }
    try{
    res.clearCookie("token")
    res.status(200).json({
        success:true,
        message:"User logged out successfully"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,
            message:"Something went wrong"})  
        
    }
    
}
export const profile=async(req,res)=>{
    const {id}=req.user
    console.log(id)
    try {
        const user=await User.findById(id)
    if(!user){
        return res.status(400).json({
            success:false,
            message:"User not found"})
    }
    res.status(200).json({
        success:true,
        message:"User found successfully",
        User:{name:user.name,
        role:user.role,
        email:user.email
    }
    })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,
            message:"Something went wrong"})
        
    }
    
}