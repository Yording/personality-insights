'use strict'

var express = require('express')
var passport = require('passport')

var router = express.Router()

router
    .get('/', passport.authenticate('twitter', {
        failureRedirect: '/signup',
        session: false
    }))
    .get('/callback', passport.authenticate('twitter',{
        successRedirect : '/personalityAnalysis',
        failureRedirect: '/signup',
        session: false
    }))

module.exports = router