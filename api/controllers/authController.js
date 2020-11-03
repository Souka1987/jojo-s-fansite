/*
 * Controller Page d'Authentification
 * ********************************** */

const bcrypt = require('bcrypt')
const User = require('../../database/models/User')


module.exports = {

    login: (req, res) => {
        res.render('login')
    },


    // // Method register (GET)
    // register: (req, res) => {
    //     // Racourcie pour accéder à la session
    //     const sess = req.session
    //     console.log(req.body)
    //     // Ici on compare les 2 mots de passe
    //     if (req.body.password !== req.body.passwordConfirm) {
    //         console.log('error password')
    //         res.render('register', {
    //             error: 'Nous rencontrons un problème avec votre mot de passe !',
    //             sess: sess
    //         })
    //     } else {
    //         // ON log si la function est OK
    //         console.log('password OK')
    //         // On demande la function de Mongo pour créé notre utilisateur
    //         User.create({
    //             // On récupère notre formulaire
    //             ...req.body,
    //             // Au cas ou une err survient en force
    //         }, (err, user) => {
    //             // Si il y a une err
    //             if (err) console.log(err)
    //             else {
    //                 // Redirection
    //                 res.redirect('register', {
    //                     success: 'Votre compte à bien été créé ;)',
    //                     sess: sess
    //                 })
    //             }
    //         })
    //     }
    // },
}