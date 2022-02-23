const express= require('express')
const { createLecture } = require('../controllers/lecture.controller')
const authenticated = require('../middlewares/authenticated')
const authorization = require('../middlewares/authorization')
const validateLecture = require('../utils/validateLecture')
const router= express.Router()

router.post('/',authenticated,authorization(['instructor','admin']),...validateLecture(),createLecture)

module.exports=router