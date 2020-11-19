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
        // Récupérer l'email et le mot de passe se trouvant dans la page 'login'
        const {
            email,
            password
        } = req.body;

        const sess = req.session,
            isAdmin = req.session.isAdmin

        console.log(req.body);
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
                            // Envoyer ce message ci-dessous:
                            error: "une erreur est survenue veuillez vérifier votre identifiant et votre mots de passe",
                            sess: sess
                        })
                    } else {
                        console.log(user);
                        req.session.userId = user._id
                        // Si l'user est rééllement l'admin
                        if (user.isAdmin === true) {
                            console.log("je suis l'admin");
                            console.log(user.isAdmin);
                            req.session.isAdmin = user.isAdmin

                        }
                        console.log(req.session)
                        //  rendre la page login

                        res.render('login', {
                            success:'Welcome !!!',
                            sess: sess
                        })

                    }
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