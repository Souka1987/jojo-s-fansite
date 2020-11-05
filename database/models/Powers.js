const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Schema
const PowersSchema = new mongoose.Schema({

    name: String,
    content1: String,
    title1: String,
    content2: String,
    title2: String,
    content3: String,
    image: String,
    imageName: String,
    createDate: {
        type: Date,
        default: new Date() // La date sera créé au moment où l'on va créer l'article.
    },
    character: {
        type: Schema.Types.ObjectId,
        ref: 'Character'
    },
    

})

// Pour récupérer les data de la base de données.
const Powers = mongoose.model('Powers', PowersSchema)

// On peut aussi le faire d'une autre manière
module.exports = Powers