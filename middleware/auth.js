/*
 *
 * Middleware Authentification
 ******************************/

const User = require('../database/models/User')

module.exports = {
    // Middleware authentifié
    auth: (req, res, next) => {
        // Connecte l'utilisateur dans la base de donné
        User.findById(req.session.userId, (err, user) => {
            console.log('middle');
            if (err || !user) return res.redirect('/')
            else next()
        })
    },
    // Middleware isAdmin
    isAdmin: (req, res, next) => {
        // Connecte l'utilisateur dans la base de donné
        User.findById(req.session.userId, (err, user) => {
            // Si il n'est pas Admin alors rediriger sur la page home
            if (!user || err || !user.isAdmin) return res.redirect('/')
            else next()
        })
    }
}