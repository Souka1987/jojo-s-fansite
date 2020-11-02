
const User = require('../database/models/User')


module.exports = (req, res, next) => {

    // Connecte toi dans la base de données

    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            return res.redirect('/')
        }
        next()
    })
}