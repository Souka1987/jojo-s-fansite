const mongoose = require("mongoose"),
    Schema = mongoose.Schema;


const CommentsSchema = new mongoose.Schema({
    // Déclaration de variable et leur type
    username: String,
    image: String,
    comment: String,
    createDate: {
        type: Date,
        default: new Date() // La date sera créé au moment même où le commentaire sera posté
    }
})

// Pour récupérer les data de la base de données.
const Comments = mongoose.model('Comments', CommentsSchema)

// On export le module
module.exports = Comments