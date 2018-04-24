const router = require('express').Router()
const {removeAnswer} = require('../controllers/post.controller')
const {auth} = require('../middleware/auth')

router
    .delete('/:id', removeAnswer)

module.exports = router