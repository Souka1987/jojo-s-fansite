const Comments = require("../../database/models/Comments")

module.exports = {
    get: async (req, res) => {
        // Chercher les commentaires dans la base de données
        const dbComments = await Comments.find({})
        console.log('Comments list')
        // Renvoyer sur la page auteur
        res.render('author', {
            // Afficher le résultat de la liste des commantaires
            comments: dbComments
        })
    },
}