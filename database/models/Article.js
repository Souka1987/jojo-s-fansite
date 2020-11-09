const mongoose = require('mongoose');

//Schema
const ArticleSchema = new mongoose.Schema({

    title: String,
    content: String

})

// Pour récupérer les data de la base de données.
const Article = mongoose.model('article', ArticleSchema)

// On peut aussi le faire d'une autre manière
module.exports = Article