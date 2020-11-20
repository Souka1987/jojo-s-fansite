// Import du module mongoose pour le lien avec la base de données
const mongoose = require('mongoose'),
    // Définition du schéma
    Schema = mongoose.Schema

// Schéma pour la création  des articles personnages
const CharacterSchema = new mongoose.Schema({

    name: String,
    content: String,
    image: String,
    imageName: String,
    createDate: {
        type: Date,
        // La date sera créé au moment où l'on va créer l'article.
        default: new Date(),
    },
    powers: {
        type: Schema.Types.ObjectId,
        ref: 'Powers'
    },
    arcs: [],
    manga: [],
    news: []

})

// Pour récupérer les data de la base de données.
const Character = mongoose.model('Character', CharacterSchema)

// On exporte le le schéma
module.exports = Character