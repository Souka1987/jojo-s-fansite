// Import 
const express = require('express'),
    router = express.Router(),
    path = require('path'),
    uploadArcs = require('./config/multerArcs'),
    uploadCharacters = require('./config/multerCharacters'),
    // Middleware
    auth = require('../middleware/auth')




const commentsContoller = require('./controllers/commentsContoller')
// CONTROLLER
const homeController = require('./controllers/homeController'),
    newsController = require('./controllers/newsController'),
    authorController = require('./controllers/authorController'),
    charactersController = require('./controllers/charactersController'),
    powersController = require('./controllers/powersController'),
    arcsController = require('./controllers/arcsController'),
    mangaController = require('./controllers/mangaController'),
    myAccountController = require('./controllers/myAccountController'),
    loginController = require('./controllers/loginController'),
    userController = require('./controllers/userController'),
    userRegisterController = require('./controllers/userRegisterController'),
    messageController = require('./controllers/messageController'),
    commentsController = require('./controllers/commentsContoller'),
    nodemailerController = require('./controllers/nodemailerController'),
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
// email (page Home)
router.route('/nodemailer')
    .post(nodemailerController.mail)



// Message
router.route('/message')
    .get(messageController.get)


// Users
// Connection
router.route('/user')
    .get(userController.get)

router.route('/login')
    .get(loginController.login)

router.route('/auth')
    .post(loginController.post)

router.route('/logout')
    .get(loginController.logout)


// Inscription
router.route('/register')
    .get(userRegisterController.register)

router.route('/create')
    .post(userRegisterController.create)


// Comments
// GET 
router.route('/comments')
    .get(commentsController.getComments)
// POST Ajouter un commentaire
router.route('/newComments')
    .post(commentsController.postComments)
// .delete(commentsController.deleteOne)



/*
 * ADMIN
 * ***** */


// Page admin
router.route('/admin')
    .get(auth.isAdmin, adminController.get)

// My Account
router.route('/myaccount')
    .get(auth.auth, myAccountController.get)

// Arcs
router.route('/admin/arcs')
    // GET récupération du formulaire formAdd
    .get(homeController.arcsPageFormAdd)
    // POST formulaire addArcs
    .post(uploadArcs.single('image'), arcsController.addArcs)

router.route('/admin/editArcs/:id')
    // GET récupéreration du formulaire 
    .get(arcsController.arcsPageFormEdit)
    // POST formulaire editArcs
    .post(uploadArcs.single('image'), arcsController.editArcs)

// Bouton de suppression
router.route('/admin/deleteArcs/:id')
    .get(arcsController.deleteArcs)


/************************************** */


// News
router.route('/admin/news')
    // GET récupération du formulaire newsFormAdd
    .get(homeController.newsFormAdd)
    // POST formulaire newsAdd
    .post(uploadArcs.single('image'), newsController.newsAdd)


router.route('/admin/editNews/:id')
    // GET récupéreration du formulaire 
    .get(newsController.editFormNews)
    // POST formulaire editNews
    .post(uploadArcs.single('image'), newsController.editNews)


// Bouton de suppression
router.route('/admin/deleteNews/:id')
    .get(newsController.deleteNews)


/************************************** */


// Characters
router.route('/admin/characters')
    // GET recupération du formulaire formAdd
    .get(charactersController.formAddCharacter)
    // POST formulaire characterAdd
    .post(uploadCharacters.single('image'), charactersController.characterAdd)

router.route('/admin/editCharacters/:id')
    // GET récupération du formulaire FormEdit
    .get(charactersController.pageFormEditCharacter)
    // POST formulaire editCharacters
    .post(uploadCharacters.single('image'), charactersController.editCharacters)

// GET bouton de suppression
router.route('/admin/deleteCharacters/:id')
    .get(charactersController.deleteCharacters)


/************************************** */


// Powers
router.route('/admin/powers')
    // GET recupération du formulaire powersPageFormAdd
    .get(powersController.powersPageFormAdd)
    // POST formulaire
    .post(uploadCharacters.single('image'), powersController.powersAdd)

router.route('/admin/editPowers/:id')
// GET recupération du formulaire powersPageFormEdit
.get(powersController.powersPageFormEdit)
// POST formulaire
.post(uploadArcs.single('image'), powersController.powersEdit)

router.route('/admin/editPowers/:id')
    // GET recupération du formulaire powersPageFormEdit
    .get(powersController.powersPageFormEdit)
    // POST formulaire
    .post(uploadCharacters.single('image'), powersController.powersEdit)

// GET bouton de suppression
router.route('/admin/deletePowers/:id')
    .get(powersController.deletePowers)




/************************************** */


// Manga
router.route('/admin/manga')
    // GET récupération du formulaire mangaFormAdd
    .get(mangaController.mangaFormAdd)
    // POST formulaire mangaAdd
    .post(uploadArcs.single('image'), mangaController.mangaAdd)

router.route('/admin/editManga/:id')
    // GET récupération du formulaire editFormMAnga
    .get(mangaController.editFormManga)
    // POST formulaire editManga
    .post(uploadArcs.single('image'), mangaController.editManga)

// GET bouton de suppression
router.route('/admin/deleteManga/:id')
    .get(mangaController.deleteManga)





// Exportation du routeur
module.exports = router