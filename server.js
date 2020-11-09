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
    //nodemailer = require('nodemailer'),
    // Import de body-parser
    bodyParser = require('body-parser'),
    // édition du texte avec "stripTags" et "limit" pour mimiter les appels de fonction avec un délai.
    {
        stripTags,
        limit,
        inc
    } = require('./helpers/hbs'),
    //port = process.env.PORT || 1870;
    TWO_HOURS = 1000 * 60 * 60 * 2,
    {
        port = 1870,
        NODE_ENV = 'developpement',
        SESS_LIFETIME = TWO_HOURS
    } = process.env,
    IN_PROD = NODE_ENV === 'production'

//ENV
require('dotenv').config()
// console.log(process.env);

// Nodemailer
// https://myaccount.google.com/
// Etape 1
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     port: 587,
//     secure: false,
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// });

// // transporter.use('compile', hbs({
// //     viewEngine: 'express-handlebars',
// //     viewPath: './views'
// // }));

// // Etape 2
// let mailOptions = {
//     from: 'soukainataa1987@gmail.com',
//     to: 'soukainataa1987@gmail.com',
//     //cc: 'soukainataattoumani@yahoo.fr',
//     subject: 'Test',
//     text: 'Welcome to Jojos World community !!!',
//     html: '<h1>Hello World !</h1>',
//     // attachments: [{
//     //     filename: 'pictures.JPG', path: './assets/images/pictures.JPG'
//     // }]
//     // template: 'mail'
// };

// // Etape 3
// transporter.sendMail(mailOptions, function (err, data) {
//     if (err) {
//         console.log('Error Occurs', err);
//     } else {
//         console.log('Email sent !!!');
//     }
// });

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
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);


// Users
app.set('trust proxy', 1)
app.use(expressSession({
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: IN_PROD
    },
    secret: 'securité',
    name: 'pépito',
    saveUninitialized: true, // Sauvegarde ce qui n'est pas initialisé
    resave: false, // Enregistre automatiquement la session même si elle n'est pas modifiée

    Store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

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

// MIDDLEWARE
// const article = require('./database/models/article');
// const articleValidPost = require('./middleware/articleValidPost');
// app.use('/article/post', articleValidPost)



// Express static permet de diriger un chemin (URL) sur un dossier en particulier
app.use('/assets', express.static('public'))

// Body parser permet de parser les data d'une page à l'autre en passant par les controllers, ... 
// Parser = https://fr.wiktionary.org/wiki/parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.urlencoded({extended: true}))



// Notre router permettra de diriger des chemins 'URL' sur les actions 'Controller' qui distriburont nos pages, ... 
// CRUD = GET / POST / PUT / DELETE
const ROUTER = require('./api/router')
app.use('/', ROUTER)



// Page erreur 404
app.use((req, res) => {
    res.render('err404')
})

// Ensuite nous demandons a express (app) de run notre projet.
app.listen(port, function () {
    console.log(`écoute le port ${port}, lancé le : ${new Date().toLocaleString()}`);
})

module.exports = app