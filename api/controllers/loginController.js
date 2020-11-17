/*
 * Controller Page d'Authentification
 * ********************************** */

const bcrypt = require('bcrypt'),
    User = require('../../database/models/User')


module.exports = {

    // GET
    login: (req, res) => {
        res.render('login')
    },

    // POST
    post: async (req, res) => {
        // Raccourcie pour la session
        const sess = req.session
        // Récupérer l'email et le mot de passe se trouvant dans la page 'login'
        const {
            email,
            password
        } = req.body;

        // Chercher le user dans la base de données par rapport à email
        User.findOne({
            email
        }, (error, user) => {
            if (user) {
                // Comparer l'email de l'user pour confirmer qu'il s'agit du même user avec bcrypt
                bcrypt.compare(password, user.password, (error, same) => {
                    if (!same) {
                        // Si ce n'est pas le même rester sur la page 'login'
                        res.render('login', {
                            // envoyer ce message ci-dessous:
                            errorLogin: "une erreur est survenue veuillez vérifier vos identifiants et vos mots de passe",
                            sess: sess
                        })
                    } else {
                        // Log Success Authentification OK
                        console.log('Success Authentification OK')

                        
                        if (user.isAdmin === true) {
                            console.log("Je suis l'Admin")
                            sess.isAdmin = user.isAdmin
                        }
                    }
                })
                // Sinon rendre la page login
            } else {
                return res.render('login', {
                    success: "vous etes connecter au nom de: " + User.pseudo,
                    sess: sess
                })
            }

        })
    },

    logout: (req, res) => {
        // Desctruction de la session utilisateur
        req.session.destroy(() => {
            // Supppression des cookies
            res.clearCookie('cookie-sess')
            console.log(req.session)
            // Retour sur la page home
            res.redirect('/')
        })
    }
}