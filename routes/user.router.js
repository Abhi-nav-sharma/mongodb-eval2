const express= require('express')
const createUser = require('../controllers/user.controller')
const authenticated = require('../middlewares/authenticated')
const upload = require('../utils/fileUpload')
const validateUser = require('../utils/validateUSer')
const router= express.Router()

router.post('/',upload.single('profile_photo_url'),...validateUser(),createUser)

module.exports=router