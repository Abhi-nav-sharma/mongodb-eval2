const {body}= require('express-validator')
const validateUser= ()=>[body("user_id").not().isEmpty().withMessage("User id should not be empty").isString().withMessage('User id should be a string'),
body("name").not().isEmpty().withMessage("Name should not be empty").isString().withMessage('Name should be a string')
,body("email").not().isEmpty().withMessage("Email should not be empty").isString().withMessage("Email should be a string"),
body("password").not().isEmpty().withMessage("Password should not be empty").isLength({min:8}).withMessage("Password should have at least 8 characters").isString().withMessage('Password should be a string')
,body("role").not().isEmpty().withMessage("Role should not be empty").isString().withMessage('Role should be a string')
]

module.exports=validateUser