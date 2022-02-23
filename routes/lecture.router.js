const express= require('express')
const { createLecture, showLectures, updateLecture } = require('../controllers/lecture.controller')
const authenticated = require('../middlewares/authenticated')
const authorization = require('../middlewares/authorization')
const validateLecture = require('../utils/validateLecture')
const router= express.Router()

router.post('/',authenticated,authorization(['instructor','admin']),...validateLecture(),createLecture)
router.get('/',showLectures)
router.get('/:lecture_id')
router.patch('/:lecture_id',authenticated,authorization(['admin']),updateLecture)
module.exports=router