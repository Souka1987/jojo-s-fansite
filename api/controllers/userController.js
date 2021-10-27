/*
 * Controller Page Users
 * ********************************** */

const path = require('path'),
    User = require('../../database/models/User'),
    fs = require('fs')

module.exports = {
    getUser: async (req, res) => {
        // Rechercher dans la database
        const dbUser = await User.find({})
        // Afficher les datas
        res.render('user', {
            users: dbUser
        })
    },

    // Suppression d'un utilisateur
    userDelete: async (req, res) => {

        // console.log('User Delete')
        // console.log(dbUser)

        const dbUser = await User.findById(req.params.id)
        User.deleteOne({ // Pour suprimer un document à la fois par son ID
            _id: req.params.id // Toujours définir le chemin de l'ID
        }, (err) => {
            if (!err) return res.redirect('/author') // Rediriger vers la page "author"
            else res.send(err) // Sinon afficher l'érreur
        })
    }
}