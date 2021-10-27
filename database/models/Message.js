const mongoose = require("mongoose"),
    Schema = mongoose.Schema;


const MessageSchema = new mongoose.Schema({
    // Déclaration de variable et leur type
    lastname: String,
    email: String,
    subject: String,
    message: String,
    createDate: {
        type: Date,
        default: new Date() // La date sera créé au moment même où le commentaire sera posté
    },
    
})

// Pour récupérer les data de la base de données.
const Message = mongoose.model('Message', MessageSchema)

// On export le module
module.exports = Message