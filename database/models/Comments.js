const mongoose = require("mongoose"),
    Schema = mongoose.Schema;


const CommentsSchema = new Schema({

    username: String,
    content: String,
    createDate: {
        type: Date,
        default: Date.now() // La date sera créé au moment même où le commentaire sera posté
    }
});

// Et l'on export notre model grace à la passerelle Mongoose
// Ce qui nous permettra de pouvoir l'utiliser sur d'autre page
module.exports = mongoose.model("Comment", CommentsSchema);