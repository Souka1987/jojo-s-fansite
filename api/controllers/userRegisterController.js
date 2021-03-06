/*
 * Controller User Register
 * ********************************** */

const User = require('../../database/models/User')

module.exports = {

    // GET
    register: (req, res) => {

        res.render('register', {
            
        })
    },

    // POST
    create: async (req, res) => {

        // Constante pour chercher un utilisateur dans la DB
        const userExist = await User.findOne({
            email: req.body.email
        })
        // Constante b pour BODY car utiliser plusieur fois 
        const b = req.body
        console.log('Controller Create User (Register)')
        // Racourcie pour acceèder à la session
        const sess = req.session
        console.log(req.body)
        // ici on demarre la boucle en allant chercher dans la DB si l'utilisateur existe deja 
        //  SI=(IF) oui alors rend le message d'erreur (res.render)"vous ete deja inscris"
        // SINON=(ELSE) alors console log "new user" et passe a la suite 

        if (userExist) {
            console.log('user Exist')
            res.render('register', {
                error: "Vous êtes déjà inscrit"
            })
        } else {
            console.log('User not Exist')

            // Ici on compare les 2 mots de passe
            if (req.body.password[0] !== req.body.password[1]) {
                console.log('error password')
                res.render('register', {
                    error: 'Nous rencontrons un problème avec votre mot de passe !',
                    sess: sess
                })

            } else {
                // ON log si la function est OK
                console.log('password OK')
                // On demande la function de Mongo pour créé notre utilisateur
                if (!b.firstname || !b.lastname || !b.email || !b.password) {
                    res.render('register', {
                        error: "Veuillez remplir tous les champs du formulaire d'inscription"
                    })

                } else {

                    // On demande la function de Mongo pour créé notre utilisateur
                    User.create({
                        // On récupère notre formulaire
                        ...req.body,
                        password: b.password[0]
                        // Au cas ou une err survient en force
                    }, (err, user) => {
                        // Si il y a une err
                        if (err) console.log(err)
                        else {
                            console.log('envoie mail verif REGISTER')
                            // Envoie du mail de verification
                            require('./nodemailerController').sendVerif(req, res, req.body.email)
                            // Redirection
                            res.render('register', {
                                success: 'Votre compte à bien été créé',
                                sess: sess
                            })
                        }
                    })
                }
            }
        }
    }
}