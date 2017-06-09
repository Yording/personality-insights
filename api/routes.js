'use strict'

var express = require('express')
var router = express.Router()
var userRoute = require('./routes/users')
var authRoute = require('./auth')

router
    .use('/users', userRoute)
    .use('/auth', authRoute)

module.exports = router;