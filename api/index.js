'use strict'

var mongoose = require('mongoose')
var app = require('./app')
var config = require('./config')

mongoose.connect(config.db.url, (err) => {
    if(err){
        console.log(`Error al conectar la B.D ${config.db.name}: ${err}`)
        throw err
    }

    app.listen(config.port, (err) => {
        if(err){
            console.log(`Error al iniciar el servidor por el puerto ${config.port}`)
            throw err
        }

        console.log(`Servidor esta corriendo por localhost:${config.port}`)

    })
})