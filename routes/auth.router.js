const express= require('express')
const { signup, signin } = require('../controllers/auth.controller')
const upload = require('../utils/fileUpload')
const validateSignin = require('../utils/validateSignin')
const validateUser = require('../utils/validateUSer')
const router= express.Router()

router.post("/signup",upload.single('profile_photo_url'),...validateUser(),signup)
router.post('/signin',...validateSignin(),signin)

module.exports= router