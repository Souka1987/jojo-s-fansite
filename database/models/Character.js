const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema pour la création  des articles personnages
const CharacterSchema = new mongoose.Schema({

    name: String,
    content: String,
    image: String,
    imageName: String, 
    createDate: {
        type: Date,
        default: new Date() // La date sera créé au moment où l'on va créer l'article.
    },
    powers: {
        type: Schema.Types.ObjectId,
        ref: 'Powers'
    }
})

// Pour récupérer les data de la base de données.
const Character = mongoose.model('Character', CharacterSchema)

// On peut aussi le faire d'une autre manière
module.exports = Character
