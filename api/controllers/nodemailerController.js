/*
 * Nodemail - Envoyer un email
 * ************************ */

// import nodemailer 
const nodemailer = require('nodemailer')


// https://myaccount.google.com/
// Etape 1
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: '587',
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});


// Etape 2
// Ici on genere nos variable en parent pour pouvoir les récupérer au retour de nos data email
// (Dans la branch nodemailer-advanced il sera générer avec un token type jwt)
// var rand, mailOptions, host, link;

module.exports = {
    // Action test boite mail > nodemailer
    test: (req, res) => {
        console.log(req.body)
        // On configure notre mail à envoyer par nodemailer
        const mailOptions = {
            from: 'soukainataa1987@gmail.com',
            to: 'soukainataa1987@gmail.com',
            //cc: 'soukainataattoumani@yahoo.fr',
            subject: 'Test',
            text: 'Welcome to Jojos World community !!!',
            html: '<h1>Hello World !</h1>',
            // attachments: [{
            //     filename: 'pictures.JPG', path: './assets/images/pictures.JPG'
            // }]
            // template: 'mail'
        }


        // Etape 3
        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log('Error Occurs', err);
            } else {
                console.log('Email sent !!!');
            }
        })
    }
}