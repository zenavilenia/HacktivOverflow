const router = require('express').Router()
const {removeComment} = require('../controllers/post.controller')
const {auth} = require('../middleware/auth')

router
    .delete('/:id', removeComment)

module.exports = router