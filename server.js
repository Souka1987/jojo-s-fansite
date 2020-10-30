/*
 * App.js
 ******************************/
const router = require('./api/router');


// Import du module http (pour afficher la page dans un naviguateur web)
// "http" est un protocole de transmission de données (www..)
//var http = require('http')

// Import de module
const
    express = require('express'),
    app = express(),
    path = require('path'),
    // Handlebars sert à créer des modèles de pages web réutilisables
    hbs = require('express-handlebars'),
    mongoose = require('mongoose'),
    
    

    
//MongoStore
mongoStore = require('connect-mongo'),
    bodyParser = require('body-parser'),
    // édition du texte avec "stripTags" et "limit" pour mimiter les appels de fonction avec un délai.
    {
        stripTags,
        limit,
        inc
    } = require('./helpers/hbs'),
    port = process.env.PORT || 1870;


//ENV
require('dotenv').config()
// console.log(process.env);

// Handlebars
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    helpers: {
        stripTags: stripTags,
        limit: limit, //"limit", pour la réduction des cards
        /* Pour l'édition de texte afin de le faire passer dans le
                moteur de templating "app.engine" */
        inc: inc
    },
    extname: 'hbs',
    defaultLayout: 'main',
    adminLayout: 'adminLayout'

}));

// MIDDLEWARE
// const article = require('./database/models/article');
// const articleValidPost = require('./middleware/articleValidPost');
// app.use('/article/post', articleValidPost)



//Admin
//  app.use(expressSession({
//  secret: 'securite',
//  name: 'biscuit',
//  saveUninitialized: true, // Sauvegarde ce qui n'est pas initialisé
//  resave: false, // Enregistre automatiquement la session même si elle n'est pas modifiée

//  Store: new mongoStore({
//      mongooseConnection: mongoose.connection
//  })
//  }))


// Mongoose pour le lien avec la base de données. "jjba" sera le nom de la base de données.
mongoose.connect(process.env.MONGO_URI, { // URI = chemin
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('Connecter à MongoDB'))
    .catch(err => console.log(err))


//Handlebars.moment => Pour formater la temporalité (dates/horraires)
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

// Express static permet de diriger un chemin (URL) sur un dossier en particulier
app.use('/assets', express.static('public'));



// Body parser permet de parser les data d'une page à l'autre en passant par les controllers, ... 
// Parser = https://fr.wiktionary.org/wiki/parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// Notre router permettra de diriger des chemins 'URL' sur les actions 'Controller' qui distriburont nos pages, ... 
// CRUD = GET / POST / PUT / DELETE
const ROUTER = require('./api/router')
app.use('/', ROUTER)


// Page erreur 404
app.use((req, res) => {
    res.render('err404')
})

// Ensuite nous demandons a express (app) de run notre projet.
app.listen(port, () => {
    console.log("le serveur tourne sur le port: " + port);
});