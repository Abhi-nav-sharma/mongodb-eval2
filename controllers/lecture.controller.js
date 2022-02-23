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

module.exports={
    createLecture
}