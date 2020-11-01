const bcrypt = require('bcrypt');
const mongoose = require('mongoose')

//Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom est obligatoire']
    },
    email: {
        type: String,
        required: [true, 'Le mail est obligatoire'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Le mot de passe est obligatoire']

    },
    imgUser: {
        type: String,
        // Une condition par default
        // Ce sera l'image par défault
        default: "https://s2.qwant.com/thumbr/0x380/6/e/46f11d586d9cbdb2eb380182ce63468791ede023d2a2ac4fc38ac1e8443d0e/img_210318.png?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_210318.png&q=0&b=1&p=0&a=1"
    }

})




// Pour récupérer les data de la base de données.
module.exports = mongoose.model('user', userSchema)