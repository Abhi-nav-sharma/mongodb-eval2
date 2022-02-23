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
        console.log(hash)
        this.password=hash
        next()
    })
})

const User= mongoose.model('users',UserSchema)

module.exports= User