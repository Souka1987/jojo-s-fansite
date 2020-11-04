/*
 * Controller Page d'Authentification
 * ********************************** */

const bcrypt = require('bcrypt')
const User = require('../../database/models/User')


module.exports = {

    login: (req, res) => {
        res.render('login')
    },

    post: (req, res) => {

        const {
            email,
            password
        } = req.body;

        User.findOne({
            email
        }, (error, user) => {
            if (user) {

                bcrypt.compare(password, user.password, (error, same) => {
                    if (!same) {
                        res.render('login', {
                            errorLogin: 'une erreur est survenue'
                        })

                    }

                })

            } else {
                return res.redirect('/')
            }

        })
    }
}