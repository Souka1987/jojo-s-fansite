// Import de mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Création du shéma Model en utilisant le constructeur de mongoose
const MangaSchema = new mongoose.Schema({
    // déclaration de variable et leur type
    title: String,
    content: String,
    image: String,
    imageName: String,
    createDate: {
        type: Date,
        default: new Date() // La date sera créé au moment où l'on va créer l'article.
    },
    character:[],
    news:[],
    arcs: {
        type: Schema.Types.ObjectId,
        ref: 'Arcs'
    },

})

// Pour récupérer les data de la base de données.
const Manga = mongoose.model('Manga', MangaSchema)

// On peut aussi le faire d'une autre manière
module.exports = Manga