const bcrypt = require('bcrypt');
const Users = require('../../database/models/Users');
const expressSession = require('express-session')

module.exports = (req, res) => {
    const {
        name,
        email,
        password,
    } = req.body;

    // Utilisateur enregistrés dans MongoDB (database)
    Users.findOne({
        email
    }, (error, user) => {
        if (user) {
            // Pour comparer les passwords
            bcrypt.compare(password, user.password, (error, same) => { // Va aller chercher le password dans la database 
                if (same) { // Si il est semblable, redirige sur la page d'acceuil

                    req.session.userId = user._id
                    /*si l'on souhaite que l'utilisateur puisse éditer un article-
                                   celui-ci prend l'id de l'utilisateur se trouvant dans la database*/
                    res.redirect('/')

                } else { // Sinon reste sur la page login
                    res.redirect('/login')
                }
            })

        } else { // Si il ne trouve pas le password dans la database, il reste sur la même page

            return res.redirect('/login')
        }


    })
}