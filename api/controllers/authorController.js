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

    // GET Suppression commentaire pour l'user
    // deleteComments: async (req, res) => {

    //     const dbComments = await Comments.findById(req.params.id)
    //     console.log('Commentaire supprimé')
    //     console.log(dbComments)

    //     Comments.deleteOne({
    //         _id: req.params.id // Toujours définir l'ID
    //     }, (err) => {
    //         if (!err) return res.redirect('/author') // Rediriger vers la page "author"
    //         else res.send(err) // Sinon afficher l'érreur
    //     })
    // },
}