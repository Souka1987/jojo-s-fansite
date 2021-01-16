/*
 * Controller Commentaires
 * ********************************** */

const Comments = require('../../database/models/Comments'),
    User = require('../../database/models/User'),
    path = require('path')


module.exports = {

    // Method Post (create + add)
    postComments: async (req, res) => {
        // Aller chercher les commentaires dans la dase de données
        const authorId = await User.findOne({
            pseudo: req.body.author
        })


        //console.log('post controller comment');
        //console.log(req.body);
        console.log(authorId);
        // Ajouter un commentaire
        Comments.create({

            // ...req.body prend par défaut tout le schéma
            ...req.body,
            authorId: authorId._id
        }, (err) => {
            if (err) console.log(err)
            // Renvoyer à la page 'auteur'
            res.redirect('/author')
            console.log('Commentaire ajouté')

        })
    },


    // GET Suppression commentaire pour l'Admin
    deleteComments: async (req, res) => {

        const dbComments = await Comments.findById(req.params.id)
        console.log('Commentaire supprimé')
        console.log(dbComments)

        Comments.deleteOne({

            _id: req.params.id // Toujours définir l'ID
        }, (err) => {
            if (!err) return res.redirect('/author') // Rediriger vers la page "admin"
            else res.send(err) // Sinon afficher l'érreur
        })
    },
}