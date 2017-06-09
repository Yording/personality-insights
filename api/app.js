'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var passport = require('passport')
var session = require('express-session')
var routes = require('./routes')

var app = express()

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(session({ secret: 'proyecto2017' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(allowCrossDomain);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use('/api', routes) 

app.get('/', (req, res) => {
    res.status(200).send({message: 'Bienvenido a la api de prueba para personality insights'})
})

app.get('/personalityAnalysis', (req, res) => {
    res.status(200).send({message: 'Logueo sastisfactorio'})
})

module.exports = app;