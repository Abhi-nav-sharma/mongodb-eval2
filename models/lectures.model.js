const mongoose = require('mongoose')

const LectureSchema= new mongoose.Schema({
    author_id:{type:String,required:true},
    title:{type:String, required:true},
    batch:{type: String, required:true}
},{timestamps:true})

const Lecture= mongoose.model('lectures',LectureSchema)

module.exports= Lecture