const User = require("../models/user.model")

const authorization= (permittedRoles)=>{
    return async (req,res,next)=>{
        if(!permittedRoles || permittedRoles.length===0){
            return next()
        }
        const user= await req.user
        const userAllowed= await User.findOne({
            user_id:user.user_id,
            role:{$in:permittedRoles}
        })
        if(userAllowed){
            return next()
        }
        return res.status(401).json({
            status:'failed',
            message:'You are not authorized to commit this action'
        })
    }
}

module.exports=authorization