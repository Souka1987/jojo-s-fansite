const bcrypt = require('bcrypt'),
    mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Le mot de passe est obligatoire']
    },
    // Notre Status sera obligatoire pour la création de middleware
    status: {
        type: String,
        default: 'user'
    },
    // Utilisé un Booleen pour nos middleware est plutot une bonne pratique
    // Par exemple :
    isVerified: {
        type: Boolean,
        default: false
    },
    isModo: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    // A vous d'éssayer de les attribuer pendant l'authentification ('/authentification') dans ../api/auth.js
    // Et essayer de les faire ressortir dans le middleware du server.js
    imgUser: {
        type: String,
        default: "https://s2.qwant.com/thumbr/0x380/6/e/46f11d586d9cbdb2eb380182ce63468791ede023d2a2ac4fc38ac1e8443d0e/img_210318.png?u=http%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_210318.png&q=0&b=1&p=0&a=1"
    }
})

UserSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted
        next()
    })
})

module.exports = mongoose.model('User', UserSchema)