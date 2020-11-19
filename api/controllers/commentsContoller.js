/*
 * Controller Commentaires
 * ********************************** */

const Comments = require('../../database/models/Comments'),
    path = require('path')


module.exports = {

    // Method Post (create + add)
    postComments: async (req, res) => {
        // Aller chercher les commentaires dans la dase de données
        const dbComments = await Comments.find({})

        console.log(req.body);
        // Ajouter un commentaire
        Comments.create({

            // ...req.body prend par défaut tout le schéma
            ...req.body,

        }, (err) => {
            if (err) console.log(err)
            // Renvoyer à la page 'auteur'
            res.redirect('/author')
            console.log('Commentaire ajouté')

        })
    },


    // GET formulaire modif commentaires
    // updateComments: async (req, res) => {
    //     // Aller chercher les commentaires dans la dase de données
    //     const dbComments = await Comments.findById(req.params.id)

    //     console.log(dbComments)
    //     res.render('/comments/editComments', {
    //         comments: dbComments
    //     })
    // },
    // // POST formulaire de modification
    // editComments: async (req, res) => {
    //     const q = req.params.id
    //     // Récupération d'un commentaire grâce au params.id
    //     const dbComments = await Comments.findById(req.params.id)

    //     console.log(req.body)
    //     Comments.findByIdAndUpdate(q, { // Définir les variables de son article

    //         // Schéma par défaut
    //         ...req.body,

    //     }, (err) => {
    //         if (err) console.log(err); // Si il y a une erreur, l'afficher
    //         // sinon rediriger sur la page "author"
    //         res.redirect('/author', {
    //             comments: dbComments
    //         })

    //     })
    // },

    // GET/DELETE Suppression commentaire
    deleteComments: async (req, res) => {

        const dbComments = await Comments.findById(req.params.id)
        console.log('Commentaire supprimé')
        console.log(dbComments)

        Comments.deleteOne({
            _id: req.params.id // Toujours définir l'ID
        }, (err) => {
            if (!err) return res.redirect('/author') // Rediriger vers la page "author"
            else res.send(err) // Sinon afficher l'érreur
        })
    }
}