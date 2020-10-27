/*
 * Controller Page Utilisateurs
 * ********************************** */

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

//Pour sécuriser un mot de passe
userSchema.pre('save', function (next) {

    // "this" correspond au schéma ci-dessus
    const user = this

    /* Méthode consistant à casser le password de l'utilisateur en milliers de morceaux lors de l'authentification,
    puis compare le nombre de morceaux cassés avec le password que l'utilisateur aura rentrer pour voir si
    celui-ci correspond */

    // ici, on lui demande de mélanger le password 10 fois
    bcrypt.hash(user.password, 10, (error, encrypted) => {

        user.password = encrypted
        next()
    })

})

//Modèle, pour mettre les infos dans la base de données.
module.exports = mongoose.model('user', userSchema)