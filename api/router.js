// Import 
const express = require('express'),
    router = express.Router(),
    path = require('path'),
    upload  = require('./config/multer')


// CONTROLLER
const homeController = require('./controllers/homeController'),
    // articleCreateController = require('./controllers/articleCreateController'),
    // articleEditController = require('./controllers/characterEditController'),
    // contactController = require('./controllers/contactController'),
    // authorController = require('./controllers/authorController'),
    charactersController = require('./controllers/charactersController'),
    arcsController = require('./controllers/arcsController'),
    // mangaController = require('./controllers/mangaController'),
    // imagesController = require('./controllers/imagesController'),
    // storeController = require('./controllers/storeController'),
    // loginController = require('./controllers/loginController'),
    // messageController = require('./controllers/messageController'),
    // registerController = require('./controllers/registerController'),
    // profileController = require('./controllers/profileController'),
    adminController = require('./controllers/admin/adminController')


/*
 * Home
 * ***** */

router.route('/')
    .get(homeController.getArcs)



/*
 * Personnages
 * *********** */

//  Page Characters Site
router.route('/characters')
    .get(charactersController.getCharacters)

// router.route('/author')
// .get(authorController.get)

// router.route('/manga')
// .get(mangaController.get)

// router.route('/images')
// .get(imagesController.get)

// router.route('/store')
// .get(storeController.get)

/*
 * CONTACT
 * ******* */

// router.route('/contact')
// .get(contactController.get)

// router.route('/login')
// .get(loginController.get)

// router.route('/message')
// .get(messageController.get)

// router.route('/register')
// .get(registerController.get)

// router.route('/profile')
// .get(profileController.get)

/*
 * ADMIN
 * ***** */

// Page admin
router.route('/admin')
    .get(adminController.get)



// ARCS
router.route('/admin/arcs')
// GET récupération du formulaire formAdd
.get(homeController.formAddArcs)
// POST formulaire addArcs
.post(upload.single('imageArcs'), arcsController.addArcs)

// Liste des UX
// router.route('/admin/users')
// .get(adminController.getUsers)

// router.route('/admin/settings')
// .get(adminController.getSettings)


// CHARACTERS
router.route('/admin/characters')
    // GET recupération du formulaire addCharacter
    .get(charactersController.formAddCharacter)
    // POST formulaire addCharacter
    .post(charactersController.addCharacters)


// router.route('/admin/characaters')
//     .get(articleEditController.get)
//     .post(articleEditController.edit)


// Exportation du routeur
module.exports = router