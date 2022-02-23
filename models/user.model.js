const mongoose = require('mongoose')
const bcrypt= require('bcrypt')

const UserSchema= new mongoose.Schema({
    user_id:{type:String,required:true,unique:true},
    name:{type:String, required:true},
    email:{type: String, required:true, unique:true},
    password:{type:String,required:true},
    profile_photo_url:{type:String,required:true},
    role:{type:String,required:true}
},{timestamps:true})

UserSchema.pre('save',function(next){
    bcrypt.hash(this.password,10,(err,hash)=>{
        if(!this.isModified('password')){
            return next()
        }
        if(err){
            return next(err)
        }
        this.password=hash
        next()
    })
})

UserSchema.methods.checkPassword= function(password){
    const hashedPassword= this.password
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password,hashedPassword,(err,same)=>{
            if(err){
                return reject(err)
            }
            resolve(same)
        })
    })
} 

const User= mongoose.model('users',UserSchema)

module.exports= User