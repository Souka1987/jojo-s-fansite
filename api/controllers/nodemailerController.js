/*
 * Nodemail - Envoyer un email
 * ************************ */

// import nodemailer 
const nodemailer = require('nodemailer'),
    dotenv = require("dotenv")

dotenv.config()

// https://myaccount.google.com/
// Etape 1
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
});

// Ici on genere nos variable en parent pour pouvoir les récupérer au retour de nos data email
// (Dans la branch nodemailer-advanced il sera générer avec un token type jwt)
//var rand, mailOptions, host, link;

module.exports = {
    // Action test boite mail > nodemailer
    mail: (req, res) => {
        console.log(req.body)
        // On configure notre mail à envoyer par nodemailer
        const mailOptions = {
            from: 'test@gmail.com',
            //cc:'soukainataattoumani@yahoo.fr',
            to: req.body.email,
            subject: 'Félicitation ! ' + req.body.lastname + ' !',
            html: `
          <h2>${req.body.lastname}, Bienvenue dans le monde de Jojo !!</h2>
          <h5>Tous sur votre manga préféré jojo's Bizarre Adventure. </h5>
          <h4>Sujet: ${req.body.subject}</h4>
          <p>${req.body.message}</p>
        `
        }

        // On demande à notre transporter d'envoyer notre mail
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err)
            else {
                console.log(info)
                res.redirect('/')
            }
        })
    },
}