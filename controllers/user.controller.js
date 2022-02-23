const { validationResult } = require("express-validator")
const User = require("../models/user.model")

const createUser= async (req,res)=>{
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
        if(!user){
            return res.status(401).json({status:'failure', message:'User not created'})
        }
        return res.status(200).json(user)
    }
    catch(err){
        return res.status(500).json({status:'failure',error:err.toString()})
    }
}

module.exports= createUser