'use strict'

var express = require('express')
var router = express.Router()
var usersCtrl = require('../controllers/users')

router
    // .get('/', usersCtrl.getArticles)
    // .post('/', usersCtrl.createArticle)
    // .delete('/:id', usersCtrl.deleteArticle)
    // .put(':/id', usersCtrl.updateArticle)
    .get('/profile/:id', usersCtrl.getUser)
    .get('/:id',usersCtrl.createAnalysis)

module.exports = router