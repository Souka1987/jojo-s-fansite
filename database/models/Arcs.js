const mongoose = require('mongoose');

//Schema
const ArcsSchema = new mongoose.Schema({

    name: String,
    content: String,
    image: String,
    createDate: {
        type: Date,
        default: new Date() //=> La date sera créé au moment où l'on va créer l'article donc, nul besion de la définir dans "add.hbs".
    }


})

//Modèle, pour mettre les infos dans la base de données.
const Arcs = mongoose.model('arcs', ArcsSchema)

//On peut aussi le faire d'une autre manière
module.exports = Arcs