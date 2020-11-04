/*
 * Controller User Register
 * ********************************** */

const User = require('../../database/models/User')

module.exports = {

    register: async (req, res) => {

        res.render('register', {
            errors: req.flash('registerError'),
            data: req.flash('data')[0]
        })
    },


    create: (req, res) => {
        // Racourcie pour acceèder à la session
        const sess = req.session
        console.log(req.body)
        // ici on compare les 2 mot de passe
        if (req.body.password !== req.body.passwordConfirm) {
            console.log('error password')
            res.render('register', {
                error: 'Nous rencontrons un problèmes avec votre mot de passe !',
                sess: sess
            })
        } else {
            // ON log si la function est OK
            console.log('password OK')
            // On demande la function de Mongo pour créé notre utilisateur
            User.create({
                // On récupère notre formulaire
                ...req.body,
                // Au cas ou une err survient en force
            }, (err, user) => {
                // Si il y a une err
                if (err) console.log(err)
                else {
                    // Redirection
                    res.render('register', {
                        success: 'Votre compte à bien été créé ;)',
                        sess: sess
                    })
                }
            })
        }
    },
}