/*
 * App.js
 ******************************/

// Import du module http (pour afficher la page dans un naviguateur web)
// "http" est un protocole de transmission de données (www..)
const http = require('http')

// Import de module
const
    express = require('express'),
    app = express(),
    path = require('path'),
    // Handlebars sert à créer des modèles de pages web réutilisables
    hbs = require('express-handlebars'),
    mongoose = require('mongoose'),
    // le flash est une zone spéciale de la session servant à stocker les datas utilisateur.
    connectFlash = require('connect-flash'),
    // Users
    expressSession = require('express-session'),
    mocha = require('mocha'),
    MongoStore = require('connect-mongo'),
    // Import de nodemailer
    nodemailer = require('nodemailer'),
    // Import de body-parser
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    // édition du texte avec "stripTags" et "limit" pour mimiter les appels de fonction avec un délai.
    {
        stripTags,
        limit,
        inc
    } = require('./helpers/hbs'),
    // Swagger
    swaggerUi = require('swagger-ui-express'),
    // Generator en lien avec swagger
    //expressOasGenerator = require('express-oas-generator')
    //expressOasGenerator.init(app, {});
    port = process.env.PORT || 1870;


//ENV
require('dotenv').config()
// console.log(process.env);

// Morgan => Middleware de journalisation des requêtes HTTP pour node.js
app.use(morgan('dev'))

// Mongoose pour le lien avec la base de données. "jjba" est le nom de la base de données.
mongoose
    .connect(process.env.MONGO_URI, { // URI = chemin
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.log(err))

// MongoStore
const mongoStore = MongoStore(expressSession) // Connection du module "MongoStore" dans "expressSession"

// Handlebars.moment => Pour formater la temporalité (dates/horraires)
const Handlebars = require("handlebars"),
    MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars)


// Users
app.use(expressSession({
    secret: 'securité',
    name: 'pépito',
    saveUninitialized: true, // Sauvegarde ce qui n'est pas initialisé
    resave: false, // Enregistre automatiquement la session même si elle n'est pas modifiée

    Store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))
app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    res.locals.isAdmin = req.session.isAdmin;
    console.log("ID Session: " + res.locals.user);
    console.log(req.session);
    next()
    
})


// Connect-Flash
app.use(connectFlash())

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


// Express static permet de diriger un chemin (URL) sur un dossier en particulier
app.use('/assets', express.static('public'))

// Body parser permet de parser les data d'une page à l'autre en passant par les controllers, ... 
// Parser = https://fr.wiktionary.org/wiki/parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.urlencoded({
    extended: true
}))



// Notre router permettra de diriger des chemins 'URL' sur les actions 'Controller' qui distriburont nos pages, ... 
// CRUD = GET / POST / PUT / DELETE
const ROUTER = require('./api/router')
app.use('/', ROUTER)


// Page erreur 404
// app.use((req, res) => {
//     res.render('err404')
// })

// Swagger
const swaggerDocument = require('./api/config/swagger.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Ensuite nous demandons a express (app) de run notre projet.
app.listen(port, function () {
    console.log(`écoute le port ${port}, lancé le : ${new Date().toLocaleString()}`);
})

module.exports = app