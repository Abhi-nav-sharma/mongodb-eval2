const {body}= require('express-validator')
const validateLecture= ()=>[body("author_id").not().isEmpty().withMessage("Author id should not be empty").isString().withMessage('Author id should be a string'),
body("title").not().isEmpty().withMessage("Title should not be empty").isString().withMessage('Title should be a string')
,body("batch").not().isEmpty().withMessage("Batch should not be empty").isString().withMessage("Batch should be a string")
]

module.exports=validateLecture