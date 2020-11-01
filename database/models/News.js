const mongoose = require('mongoose');

//Schema
const NewsSchema = new mongoose.Schema({

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
const News = mongoose.model('news', NewsSchema)

// On peut aussi le faire d'une autre manière
module.exports = News