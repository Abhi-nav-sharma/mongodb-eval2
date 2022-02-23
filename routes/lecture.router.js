const express= require('express')
const { createLecture, showLectures, updateLecture, lectureById, deleteLecture } = require('../controllers/lecture.controller')
const authenticated = require('../middlewares/authenticated')
const authorization = require('../middlewares/authorization')
const validateLecture = require('../utils/validateLecture')
const router= express.Router()

router.post('/',authenticated,authorization(['instructor','admin']),...validateLecture(),createLecture)
router.get('/',showLectures)
router.get('/:lecture_id',lectureById)
router.patch('/:lecture_id',authenticated,authorization(['admin']),updateLecture)
router.delete('/:lecture_id',authenticated,authorization(['admin']),deleteLecture)
module.exports=router