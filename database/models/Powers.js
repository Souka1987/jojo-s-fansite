// Import de mongoose
const mongoose = require('mongoose')

// Création du shéma Model en utilisant le constructeur de mongoose
const PowersSchema = new mongoose.Schema({
    // déclaration de variable et leur type
    name: String,
    type: String,
    abilities: String
    // appearance: String

})

//Modèle, pour mettre les infos dans la base de données.
const Powers = mongoose.model('Character', PowersSchema)

//On peut aussi le faire d'une autre manière
module.exports = Powers