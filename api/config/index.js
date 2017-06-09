'use strict'

module.exports = {
    port: Number(process.env.PORT || 3000),
    db: {
        name: "prototype-personality-insights",
        url: process.env.MONGODB || "mongodb://yording9:proyecto2017@ds033477.mlab.com:33477/personality-insights"
        // url: process.env.MONGODB || "mongodb://localhost/prototype-personality-insights"
    },

    facebook: {
        clientID:     process.env.FACEBOOK_ID || '194033921121385',
        clientSecret: process.env.FACEBOOK_SECRET || '34bb4731dc310563eb58b93fcceaaa0d',
        callbackURL:  '/api/auth/facebook/callback'
    },

    twitter: {
        clientID:     process.env.TWITTER_ID || 'id',
        clientSecret: process.env.TWITTER_SECRET || 'secret',
        callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
    },

    google: {
        clientID:     process.env.GOOGLE_ID || 'id',
        clientSecret: process.env.GOOGLE_SECRET || 'secret',
        callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
    }
}