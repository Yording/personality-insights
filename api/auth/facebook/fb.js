'use strict'

var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy

module.exports = {
    setup: function (User, config){
        passport.use('facebook', new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL,
            // profileFields: ['id', 'displayName', 'link', 'about_me', 'photos', 'email']
        },
        // facebook enviara de regreso los tokens y perfil
        function(accessToken, refreshToken, profile, done) {
            // encuentra al usuario en la base de datos basada en su ID de facebook
            process.nextTick(function(){
                User.findOne({
                    'facebook.id': profile.id
                })
                .then(function(err, user){         
                    // si hay un error, detener todo y devolverlo
                    // es decir, un error de conexión a la base de datos
                    if(err)
                        return done(err)

                    
                    // si se encuentra al usuario, entonces se inicia sesión
                    if(user){
                        return done(null, user)
                    }
                    else{
                        
                        // si no hay ningún usuario que se encuentre con ese 
                        // ID de Facebook, se crea un nuevo usuario
                        var newUser = new User({
                            name: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: 'cu@gmail.com',
                            provider: 'facebook',
                            facebook: profile._json
                        })

                        // Guardamos el usuario en la Bd
                        newUser.save()
                        .then(function(user){
                            return done(null, user)
                        })
                        .catch(function(err){
                            return done(err)
                        });
                    }

                })
                .catch(function(err){
                    return done(err)
                })
            })
            
        }))

    }

}