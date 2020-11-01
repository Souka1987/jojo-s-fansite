const mongoose = require('mongoose');

//Schema
const ArcsSchema = new mongoose.Schema({

    title: String,
    content: String,
    image: String,
    imageName: String,
    createDate: {
        type: Date,
        default: new Date() // La date sera créé au moment où l'on va créer l'article.
    }


})

// Pour récupérer les data de la base de données.
const Arcs = mongoose.model('arcs', ArcsSchema)

// On peut aussi le faire d'une autre manière
module.exports = Arcs