const express= require('express')
const connect  = require('./config/db')
const app= express()
const cors= require('cors')
const PORT= 5000
const authRouter= require('./routes/auth.router')
const userRouter= require('./routes/user.router')
app.use(cors())

app.use(express.json())
app.use('/auth',authRouter)
app.use('/users',userRouter)

const start= async ()=>{
    await connect()
    console.log('connected to mongo')
    app.listen(PORT,(req,res)=>{
        console.log('listening on port',PORT)
    })
}

module.exports= start