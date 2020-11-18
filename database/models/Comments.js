const mongoose = require("mongoose"),
    Schema = mongoose.Schema;


const CommentsSchema = new mongoose.Schema({
// déclaration de variable et leur type
    username: String,
    comment: String,
    createDate: {
        type: Date,
        default: new Date()  // La date sera créé au moment même où le commentaire sera posté
    }
})

// Et l'on export notre model grace à la passerelle Mongoose
// Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
module.exports = mongoose.model("Comment", CommentsSchema);