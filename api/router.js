// Import
const express = require('express'),
    router = express.Router(),
    path = require('path')

// Controller
const homeController = require('./controllers/homeController'),
    articleController = require('./controllers/articleController'),
    contactController = require('./controllers/contactController'),
    authorController = require('./controllers/authorController'),
    charactersController = require('./controllers/charactersController'),
    mangaController = require('./controllers/mangaController'),
    imagesController = require('./controllers/imagesController'),
    storeController = require('./controllers/storeController'),
    loginController = require('./controllers/loginController'),
    messageController = require('./controllers/messageController'),
    registerController = require('./controllers/registerController'),
    profileController = require('./controllers/profileController'),
    homedashboardController = require('./controllers/homedashboardController')





// Home
router.route('/')
    .get(homeController.get)

// Article
router.route('/article')
    .get(articleController.get)

router.route('/author')
    .get(authorController.get)

router.route('/characters')
    .get(charactersController.get)

router.route('/manga')
    .get(mangaController.get)

router.route('/images')
    .get(imagesController.get)

router.route('/store')
    .get(storeController.get)

// Contact
router.route('/contact')
    .get(contactController.get)

router.route('/login')
    .get(loginController.get)

router.route('/message')
    .get(messageController.get)

router.route('/register')
    .get(registerController.get)

router.route('/profile')
    .get(profileController.get)

// Admin
router.route('/homedashboard')
    .get(homedashboardController.get)

module.exports = router;