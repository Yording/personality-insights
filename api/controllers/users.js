'use strict'

var PersonalyInsightsV3 = require('watson-developer-cloud/personality-insights/v3')
// var Article = require('../models/article');
var User = require('../models/user')

module.exports = {
    getUser: (req, res) => {
        var userId = req.params.id
        User.findById(userId, (err, user) => {
            if(err)
                return res.status(500).send({message: `Error al realizar la petición: ${err}`})

            if(!user)
                return status(404).send({message: "El usuario no existe"})

            return res.status(200).send({user: user})
        })
    },
    // getArticles: (req, res) => {
    //     Article.find({}, (err, articles) => {
    //         if(err)
    //             return res.status(500).send({message: `Error al realizar la petición: ${err}`})

    //         if(!articles)
    //             return res.status(404).send({message: 'No se encontraron articles'})

    //         return res.status(200).send({articles: articles})
    //     })
    // },
    // createArticle: (req, res) => {
    //     var article = new Article({
    //         title: req.body.title,
    //         description: req.body.description,
    //         url: req.body.url,
    //         tags: req.body.tags
    //     })

    //     article.save((err, article) => {
    //         if(err)
    //             return res.status(500).send({message: `Error al realizar la petición: ${err}`})
            
    //         return res.status(200).send({article: article})
    //     }) 
    // },
    // deleteArticle: (req, res) => {
    //     var articleId = req.params.id

    //     Article.findById(articleId, (err, article) => {
    //         if(err)
    //             return res.status(500).send({message: `Error al realizar la petición: ${err}`})

    //         article.remove(err => {
    //             if(err)
    //                 return res.status(500).send({message: `Error al borrar el articulo: ${err}`})

    //             return res.status(200).send({ message: "El articulo ha sido eliminado" });
    //         })
    //     })
    // },
    // updateArticle: (req, res) => {
    //     var articleId = req.params.id
    //     var update = req.body

    //     Product.findByIdAndUpdate(articleId, update, (err, article) => {
    //         if (err) 
	// 			return res.status(500).send({ message: `Error al actualizar el articulo: ${err}`});

	// 		return res.status(200).send({ article: article });
    //     })
    // },
    createAnalysis: function(req, res){
        var personalityInsights = new PersonalyInsightsV3({
            "url": "https://gateway.watsonplatform.net/personality-insights/api",
            "username": "d01e45f9-c8a7-4afd-a65a-c9de8f454315",
            "password": "rsTmuvpz3MKZ",
            version_date: '2016-10-20',
            headers: {
                'X-Watson-Learning-Opt-Out': 'true'
            }
        })

        var params = {
            text: `Hi, my name is yording and I am 22 years old, currently living as my mother and sister in a small house, 
            my hobbies are playing sports, playing soccer, watching videos and movies, playing video games, enjoying going out to the 
            park to walk the dog , I like to cook, to have fun with my friends, to go out some night party, I would like to travel to 
            know places of the world and to learn of new cultures and people. I do not have a girlfriend, but I would like to have one 
            with blue or green eyes, blond hair, thick lips, bushy eyebrows, perfect white teeth, good body, like what I do. I also know
             that I am a Systems Engineer recently graduated in Colombia, I am in the process of studying machine learning to add a plus 
             to my career as a software developer, I also tell you that I do not like to work, that's because I want to create my own company 
             that Will be the best in the world, I want to create things that improve my city and the lives of all people who use our services, 
             happiness is one of my goals and I hope that with patience and effort someday`,
            // content_items: require('./data/profile.json').contentItems,
            consumption_preferences: true,
            raw_scores: true,
            headers: {
                'accept-language': 'en',
                'accept': 'application/json'
            }
        }
        personalityInsights.profile(params, function(error, response) {
            if(error)
                return res.status(500).send({message: `Error al realizar la petición: ${error}`})
            else
                User.update({_id: req.params.id},{'analysis':response},function(err,doc){
                    if(err)
                        console.log(err)
                    else
                        res.status(200).send({message: "Analisis creado sastisfactoriamente"})
                })
                
        })
    }
}