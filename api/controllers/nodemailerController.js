/*
 * Nodemail - Envoyer un email
 * ************************ */

// import nodemailer 
const nodemailer = require('nodemailer'),
    User = require('../../database/models/User')

// https://myaccount.google.com/
// C'est en quelque sorte notre connexion à notre boite mail
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: '587',
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

// Ici on génère nos variables en parent pour pouvoir les récupérer au retour de nos data email
// (Dans la branch nodemailer-advanced il sera générer avec un token type jwt)
var rand, mailOptions, host, link;

module.exports = {
    // Action test boite mail > nodemailer
    mail: (req, res) => {
        console.log(req.body)
        // On configure notre mail à envoyer par nodemailer
        const mailOptions = {
            from: 'test@gmail.com',
            //cc: 'soukainataattoumani@yahoo.fr',
            //cci: '',
            to: req.body.email,
            subject: 'Félicitation ! ' + req.body.name + ' !',
            html: `
          <h2>${req.body.name}, Bienvenue dans le monde de Jojo !!</h2>
          <h5>Tous sur ton manga préféré jojo's Bizarre Adventure. </h5>
          <h4>Sujet: ${req.body.subject}</h4>
          <p>${req.body.message}</p>
        `,

        }
        console.log(mailOptions)

        // On demande à notre transporter d'envoyer notre mail
        transporter.sendMail(mailOptions, (err, res, next) => {
            if (err) {
                console.log(err)
                res.end("error")
            } else {
                console.log("Message Envoyer")
                next()
            }
        })
        // Réponse
        res.render('index', {
            success: "Un email de vérification à bien été envoyer à " + req.body.email
        })
    },

    // Envoie du message de vérification
    sendVerif: (req, res) => {

        // génération d'un chiffre random
        rand = Math.floor((Math.random() * 100) + 54)
        // on definit notre host
        host = req.get('host')
        // on définit le lien
        link = "http://" + req.get('host') + "/verify/" + rand
        // et enfin notre mail
        mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "Confirmation d'adresse mail.",
            rand: rand,
            html: `
        <h2>Tu y es presque</h2><br>
        <h5>Cliques sur le lien suivant afin de finir la procédure de validation de mail.</h5><br>
        <a href=" ` + link + ` ">Cliques ici</a>
      `
        }
        console.log(mailOptions)

        // Et envoi notre mail avec nos callback
        transporter.sendMail(mailOptions, (err, res, next) => {

            if (err) {
                console.log(err)
                res.send("error")

            } else {
                console.log("Message Envoyer")
                next()

            }
        })
        // Response
        res.render('index', {
            success: "Un email de vérification à bien été envoyer à " + req.body.email
        })
    },

    // Génération de la page ID (Unique)
    verifMail: async (req, res) => {
        const user = await User.findOne({
            email: mailOptions.to
        })
        console.log(req.protocol + "://" + req.get('host'))
        console.log('Page verifid: ')

        // Ici on tcheck notre protocole hébergeur (nodejs localhost) et le liens générer dans le mail
        if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
            console.log("Le domaine correspond. Les informations proviennent d'un e-mail authentique")

            // Ici on tcheck notre id du mail avec la variable enregistrer en cache (rand)
            if (req.params.id == mailOptions.rand) {
                console.log("l'email a été vérifié")
                res.render('verifId', {
                    email: mailOptions.to,
                    user: user
                })

            } else {
                console.log("l'email n'a pas pu être vérifié")
                res.render('verifId', {
                    message: "Bad Request !"
                })

            }
        } else {
            res.render('verifId', {
                message: "La requête vient d'une source inconnue"
            })

        }
    },

    // Mot de passe oublié: Envoie du mail
    lostPassword: async (req, res) => {
        const user = await User.findOne({
            email: req.body.email
        })

        console.log(req.body);
        //console.log('lostpassword');
        if (user) {
            // génération d'un chiffre random
            rand = Math.floor((Math.random() * 100) + 54)
            // on definit notre host
            host = req.get('host')
            // on définit le lien
            link = "http://" + req.get('host') + "/lostpassword/" + rand
            // et enfin notre mail
            mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: "Création d'un nouveau mot de passe",
                rand: rand,
                html: `
        <h2>Tu y es presque</h2><br>
        <h5>Cliques sur le lien suivant afin de terminer la procédure de recréation du mot de passe.</h5><br>
        <a href=" ` + link + ` ">Cliques ici</a>
      `
            }
            console.log(mailOptions)
            // Et envoi notre mail avec nos callback
            transporter.sendMail(mailOptions, (err, res, next) => {
                if (err) {
                    console.log(err)
                    res.end("error")
                } else {
                    console.log("Message Envoyé")
                    next()
                }
            })
            // Réponse
            res.render('index', {
                success: "Un email à bien été envoyer à " + req.body.email
            })

        } else res.redirect('/')
    },
    // Génération de la page ID (Unique)
    editPassword: (req, res) => {
        console.log(req.protocol + "://" + req.get('host'))
        console.log('Page lostpassword ID')

        // Ici on tcheck notre protocole hébergeur (nodejs localhost) et le liens générer dans le mail
        if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
            console.log("Le domaine correspond. Les informations proviennent d'un e-mail authentique")

            // Ici on tcheck notre id du mail avec la variable enregistrer en cache (rand)
            if (req.params.id == mailOptions.rand) {
                console.log("l'email a été vérifié")
                // res.end("<h1>Email " + mailOptions.to + " is been Successfully verified")
                res.render('editPassword', {
                    mailOptions,
                })

            } else {
                console.log("email non vérifié")
                res.render('editPassword', {
                    message: "Bad Request !"
                })
            }

        } else {
            res.render('editPassword', {
                message: "La demande provient d'une source inconnue !"
            })
        }
    },



}