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

})


// Pour récupérer les data de la base de données.
module.exports = mongoose.model('user', userSchema)