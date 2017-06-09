'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var routes = require('./routes')

var app = express()

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan('dev'))
app.use('/api', routes) 

app.get('/', (req, res) => {
    res.status(200).send({message: 'Bienvenido a la api de prueba para personality insights'})
})

module.exports = app;