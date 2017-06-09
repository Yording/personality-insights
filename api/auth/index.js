'use strict';

var express = require('express')
var passport = require('passport')
var config = require('../config')
var User = require('../models/user')
// Passport Configuration
// require('./local/passport').setup(User, config);
require('./facebook/fb').setup(User, config.facebook)
// require('./google/passport').setup(User, config);
require('./twitter/twitter').setup(User, config.twitter);

var router = express.Router();

// router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));
router.use('/twitter', require('./twitter'));
// router.use('/google', require('./google'));

module.exports = router;