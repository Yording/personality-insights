'use strict'

var passport = require('passport')
var TwitterStrategy = require('passport-twitter').Strategy

module.exports = {
    setup: function(User, config){
        passport.use('twitter', new TwitterStrategy({
            consumerKey: config.clientID,
            consumerSecret: config.clientSecret,
            callbackURL: config.callbackURL
        },
        // twitter enviara de regreso los tokens y perfil
        function(token, tokenSecret, profile, done){
            process.nextTick(function(){
                User.findOne({
                    'twitter.id_str': profile.id.toString()
                })
                .then(function(err, user){
                    if(err)
                        return done(err)
                    
                    if(user){
                        return done(null, user)
                    }
                    else{
                        var newUser = new User({
                            name: profile.displayName,
                            email: 'prueba@gmail.com',
                            provider: 'twitter',
                            twitter: profile._json
                        })

                        newUser.save()
                        .then(function(user){
                            return done(null, user)
                        })
                        .catch(function(err){
                            return done(err)
                        })
                    }
                })
                .catch(function(err){
                    return done(err)
                })
            })
        
        }))
    }
}