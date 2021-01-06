// Import 
const express = require('express'),
    router = express.Router(),
    path = require('path'),
    uploadArcs = require('./config/multerArcs'),
    uploadCharacters = require('./config/multerCharacters'),
    // Middleware
    auth = require('../middleware/auth')




// CONTROLLER
const homeController = require('./controllers/homeController'),
    newsController = require('./controllers/newsController'),
    authorController = require('./controllers/authorController'),
    charactersController = require('./controllers/charactersController'),
    powersController = require('./controllers/powersController'),
    arcsController = require('./controllers/arcsController'),
    mangaController = require('./controllers/mangaController'),
    loginController = require('./controllers/loginController'),
    userController = require('./controllers/userController'),
    userRegisterController = require('./controllers/userRegisterController'),
    messageController = require('./controllers/messageController'),
    commentsController = require('./controllers/commentsContoller'),
    nodemailerController = require('./controllers/nodemailerController'),

    // ADMIN CONTROLLERS
    adminController = require('./controllers/admin/adminController'),
    {
        route
    } = require('../server')



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

/*
 * Auteur
 * *********** */

router.route('/author')
    .get(authorController.get)



/*
 * Manga
 * *********** */

router.route('/manga')
    .get(mangaController.getManga)


/*
 * CONTACT
 * ******* */


// Nodemailer
// email (page Message)
router.route('/nodemailer')
    .post(nodemailerController.mail)

// email de verification
router.route('/verification')
    .post(nodemailerController.sendVerif)

// Mot de passe oublier
router.route('/lostpassword')
    .post(nodemailerController.lostPassword)

// Page de mot de passe oublier
router.route('/lostpassword/:id')
    .get(nodemailerController.editPassword)




// Message
router.route('/message')
    .get(messageController.get)


/************************************** */


// Users
// Connection
router.route('/user')
    .get(auth.isUser, userController.getUser)


router.route('/login')
    .get(loginController.login)

router.route('/auth')
    .post(loginController.post)

// Déconnexion
router.route('/logout')
    .get(loginController.logout)

// Mot de passe oublier
router.route('/editPassword/:id')
    .post(loginController.editPasswordPost)

// Page de vérification
router.route('/verify/:id')
    .get(nodemailerController.verifMail)
    .post(loginController.verifMailPost)



// Inscription
router.route('/register')
    .get(userRegisterController.register)

router.route('/create')
    .post(userRegisterController.create)


/************************************** */


// Comments
// POST Ajouter un commentaire
router.route('/newComments')
    .post(commentsController.postComments)

// /GET Suppression commentaires 
router.route('/deleteComments/:id')
    .get(auth.isAdmin, commentsController.deleteComments)

// /GET Suppression commentaires 
// router.route('/deleteComments/:id')
//     .get(auth.isUser, authorController.deleteComments)


/*
 * ADMIN
 * ***** */


// Page admin
router.route('/admin')
    .get(auth.isAdmin, adminController.get)

// C.R.U.D

// Arcs
router.route('/admin/arcs')
    // GET récupération du formulaire formAdd
    .get(auth.isAdmin, homeController.arcsPageFormAdd)
    // POST formulaire addArcs
    .post(uploadArcs.single('image'), auth.isAdmin, arcsController.addArcs)

router.route('/admin/editArcs/:id')
    // GET récupéreration du formulaire 
    .get(auth.isAdmin, arcsController.arcsPageFormEdit)
    // POST formulaire editArcs
    .post(uploadArcs.single('image'), auth.isAdmin, arcsController.editArcs)

// Bouton de suppression
router.route('/admin/deleteArcs/:id')
    .get(auth.isAdmin, arcsController.deleteArcs)


/************************************** */


// News
router.route('/admin/news')
    // GET récupération du formulaire newsFormAdd
    .get(auth.isAdmin, homeController.newsFormAdd)
    // POST formulaire newsAdd
    .post(uploadArcs.single('image'), auth.isAdmin, newsController.newsAdd)


router.route('/admin/editNews/:id')
    // GET récupéreration du formulaire 
    .get(auth.isAdmin, newsController.editFormNews)
    // POST formulaire editNews
    .post(uploadArcs.single('image'), auth.isAdmin, newsController.editNews)


// Bouton de suppression
router.route('/admin/deleteNews/:id')
    .get(auth.isAdmin, newsController.deleteNews)


/************************************** */


// Characters
router.route('/admin/characters')
    // GET recupération du formulaire formAdd
    .get(auth.isAdmin, charactersController.formAddCharacter)
    // POST formulaire characterAdd
    .post(uploadCharacters.single('image'), auth.isAdmin, charactersController.characterAdd)

router.route('/admin/editCharacters/:id')
    // GET récupération du formulaire FormEdit
    .get(auth.isAdmin, charactersController.pageFormEditCharacter)
    // POST formulaire editCharacters
    .post(uploadCharacters.single('image'), auth.isAdmin, charactersController.editCharacters)

// GET bouton de suppression
router.route('/admin/deleteCharacters/:id')
    .get(auth.isAdmin, charactersController.deleteCharacters)


/************************************** */


// Powers
router.route('/admin/powers')
    // GET recupération du formulaire powersPageFormAdd
    .get(auth.isAdmin, powersController.powersPageFormAdd)
    // POST formulaire
    .post(uploadCharacters.single('image'), auth.isAdmin, powersController.powersAdd)

router.route('/admin/editPowers/:id')
    // GET recupération du formulaire powersPageFormEdit
    .get(auth.isAdmin, powersController.powersPageFormEdit)
    // POST formulaire
    .post(uploadCharacters.single('image'), auth.isAdmin, powersController.powersEdit)

//GET bouton de suppression
router.route('/admin/deletePowers/:id')
    .get(auth.isAdmin, powersController.deletePowers)




/************************************** */


// Manga
router.route('/admin/manga')
    // GET récupération du formulaire mangaFormAdd
    .get(auth.isAdmin, mangaController.mangaFormAdd)
    // POST formulaire mangaAdd
    .post(uploadArcs.single('image'), auth.isAdmin, mangaController.mangaAdd)


router.route('/admin/editManga/:id')
    // GET récupération du formulaire editFormMAnga
    .get(auth.isAdmin, mangaController.editFormManga)
    // POST formulaire editManga
    .post(uploadArcs.single('image'), auth.isAdmin, mangaController.editManga)

// GET bouton de suppression
router.route('/admin/deleteManga/:id')
    .get(auth.isAdmin, mangaController.deleteManga)


/************************************** */

// Users
router.route('/admin/userDelete/:id')
    .get(auth.isAdmin, userController.userDelete)



// Exportation du routeur
module.exports = router