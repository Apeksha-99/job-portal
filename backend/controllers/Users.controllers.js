import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req,res)=>{
    try {
        const {fullname, email, phoneNumber, password, role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success: false
            })
        }
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({
            message: 'User already exist',
            success: false
        })
    }
const hashPassword = await bcrypt.hash(password,10);
await User.create({
    fullname, 
    email,
     phoneNumber,
      password:hashPassword,
      role,
})
    return res.status(201).json({
        message: 'Axxount created Successfully',
        success: true
    })
}
    catch (error) {
        console.log('error')
    }
}


export const login = async (req, res) => {
    try{
        const {email, password, role} = req.body;       
         if(!email || !password || !role){
            return res.status(400).json({
                message:"Something is missing",
                success: false
            })
        };
         let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message: "incorrect email or password",
            success:false
        })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch) {
        return res.status(400).json({
            message:'incorrect email or password',
            suceess: false,
        })
    };
    
    if(role !== user.role){
        return res.status(400).json({
            message: "Account doesn't exist with current role",
            success: false
        })
        
    }
    
    const tokenData = {
        userId: user._id
    }

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '1d'} );

    user = {
        _id:user._id,
        fullname: user.fullname,
        email: updateProfiles.email,
        phoneNumber: user.phoneNumber,
        role:user.role,
        profile:user.profile
    }
    
    return res.status(200).cookie('token',token, {maxAge:1*24*60*60*1000, httpOnly:true, sameSite: 'strict'}).json({
        message: `welcome back ${user.fullname}`,
        success: true
    })
    }
    catch(error){
        console.log('error')
    }
}


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"logout successfully",
            success: true
        })
        
    } catch (error) {
        console.log('error')
    }
}   

export const updateProfile = async (req,res) =>{
    try {
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file;

let skillsArray;
        if(skills){
            skillsArray = skills.split(',');
        }

        const userId = req.id;
        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message: 'User no t found',
                success: false
            })
        }

        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio)user.profile.bio = bio
        if(skills)user.profile.skills = skillsArray


        await user.save();

           user = {
        _id:user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role:user.role,
        profile:user.profile
    }
    return res.status(200).json({
        message: 'profile updated successfully',
        user,
        success:true
    })
        
    } catch (error) {
        console.log('error');
        
    }
}