'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema


var gender= ["M","F"];
var emailMatch= [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"coloca un email válido"];
var userSchema = new Schema(
    {
        name: String,
        lastName: String,
        gender: {
            type: String,
            enum: {
                values: gender,
                message: "Opción no válida"
            }
        },
        email: {
            type: String,
            match: emailMatch
        },
        birthDate: Date,
        analysis: {
            type: Array
        },
        provider: String,
        facebook: {},
        twitter: {},
        google: {},
        github: {}
    }
)

var User = mongoose.model('User', userSchema)

module.exports = User