const Lecture = require("../models/lectures.model")

const createLecture= async (req,res)=>{
    try{
        const lecture= await Lecture.create({
            author_id:req.body.author_id,
            title:req.body.title,
            batch:req.body.batch
        })
        if(!lecture){
            return res.status(401).json({status:'failure', message:'Lecture not created'})
        }
        return res.status(200).json(lecture)
    }
    catch(err){
        return res.status(500).json({status:'failure',error:err.toString()})
    }
}

const showLectures= async(req,res)=>{
    try{
        const lectures= await Lecture.find()
        if(!lectures){
            return res.status(500).json({message:'No lectures found'})
        }
        res.status(200).json(lectures)
    }
    catch(err){
        return res.status(500).json({status:'failure',error:err.toString()})
    }
}
const updateLecture= async(req,res)=>{
    try{
        const lecture= await Lecture.findOneAndUpdate({
            _id:req.params.lecture_id
        },{
            $set:{
                title:req.body.title,
                batch:req.body.batch
            }
        },{
            returnOriginal:false
        })
        if(!lecture){
            return res.status(400).json({msg:'Lecture not found'})
        }
        return res.status(200).json(lecture)
    }
    catch(err){
        return res.status(400).json({msg:'Something went wrong'}) 
    }
}
const lectureById= async(req,res)=>{
    try{
        const lecture= await Lecture.findById(req.params.lecture_id)
        if(!lecture){
            return res.status(400).json({msg:'Lecture not found'})
        }
        return res.status(200).json(lecture)
    }
    catch(err){
        return res.status(500).json({msg:'Something went wrong'}) 
    }
}
module.exports={
    createLecture,showLectures,updateLecture
}