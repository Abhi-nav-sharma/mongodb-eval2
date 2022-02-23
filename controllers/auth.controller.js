const User= require('../models/user.model')
const jwt= require('jsonwebtoken')
const { validationResult } = require('express-validator')
require('dotenv').config()

const generateToken= (user)=>{
    return jwt.sign({
        id:user.user_id,
        email: user.email
    },process.env.SECRET_KEY,
    {expiresIn:'1h'}
    )
}

const signup = async (req,res)=>{
    const errors= validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
    try{
        const user= await User.create({
            user_id:req.body.user_id,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            profile_photo_url:req.file.path,
            role:req.body.role
        })
        const token =generateToken(user)
        res.status(201).json({status:'success',data:user,token})
    }
    catch(err){
        res.status(400).json({status:'failure',msg:err.toString()})
    }
}

const signin= async (req,res)=>{
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    let user
    try{
        user= await User.findOne({email:req.body.email}).exec()

        if(!user){
            return res.status(401).json({status:'failure', message:'Invalid email or password'})
        }
    }
    catch(err){
        return res.status(500).json({status:'failure', message:err.toString()})
    }
    let match
    try{
       match= await user.checkPassword(req.body.password)
            if(!match){
                return res.status(401).json({status:'failure', message:'Invalid email or password'})
            }
    }
    catch(err){
        return res.status(500).json({status:'failure', message:err.toString()})
    }
    const token= generateToken(user)
    return res.status(200).json({status:'Success',data:{
        id:user.user_id,
        email:user.email,
        token
    }})
}

module.exports={
    signin,
    signup
    // ,generateToken
}