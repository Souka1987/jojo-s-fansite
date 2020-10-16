const mongoose = require('mongoose');

// Schema pour la création de des articles
const CharacterSchema = new mongoose.Schema({

    name: String,
    content: String,
    image: String,
    createDate: {
        type: Date,
        default: new Date() //=> La date sera créé au moment où l'on va créer l'article.
    }


})

//Modèle, pour mettre les infos dans la base de données.
const Character = mongoose.model('Character', CharacterSchema)

//On peut aussi le faire d'une autre manière
module.exports = Character