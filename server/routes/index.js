const router = require('express').Router()
const {login, register} = require('../controllers/user.controller')
const {sendNotification} = require('../controllers/mail.controller')

router
    .post('/login', login)
    .post('/register', register)
    .post('/sendNotification', sendNotification)

module.exports = router