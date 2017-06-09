'use strict';

var express = require('express')
var passport = require('passport')
var setTokenCookie = require('../auth.service')

var router = express.Router();

router

    // ruta para la autenticación y el inicio de sesión de facebook
    // diferentes ámbitos al iniciar sesión
  .get('/', passport.authenticate('facebook', {
    scope: ['email','user_about_me','read_insights'],
    failureRedirect: '/signup',
    session: false
  }))
  .get('/callback', passport.authenticate('facebook', {
    successRedirect : '/personalityAnalysis',
    failureRedirect: '/signup',
    session: false
  }));

module.exports = router