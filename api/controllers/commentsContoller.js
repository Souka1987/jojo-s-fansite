const Comments = require('../../database/models/Comments')


module.exports = {
    // Method get (Récupération)
    getComments: async (req, res) => {

        // Chercher les commentaires dans la base de données
        const dbComments = await Comments.find({})

        // Renvoyer sur la page auteur
        res.render('author', {
            // Afficher le résultat de la liste de commantaires
            comments: dbComments
        });
        console.log('Comment list');
    },

    // Method Post (create + add)
    postComments: async (req, res) => {

        console.log(req.body);
        // Ajouter un commentaire
        Comments.create(req.body, (err, comments) => {
            // voir si il n'y a pas d'erreur
            if (err) {
                console.log(err);
                // Si il y en une alors les instructions suivantes ne seront pas éxécutées 'throw'
                throw err;
            }
            console.log(comments);
        })
        // Aller chercher les commentaires dans la dase de données
        const dbComments = await Comments.find({})

        // Renvoyer à la page 'auteur'
        res.render('author', {
            comments: dbComments
        });
        console.log('Commentaire ajouté');
    },

    // Modification du commentaire
    updateComments: async (req, res) => {
        // Aller chercher les commentaires dans la dase de données
        const dbComments = await Comments.findById(req.params.id)
        console.log(dbComments)
        res.render('/comments/editComments', {
            comments: dbComments
        })
    },

    editComments: async (req, res) => {
        const q = req.params.id
        // Aller chercher les commentaires dans la dase de données
        const dbComments = await Comments.findById(req.params.id)

        console.log(req.params.id);
        Comments.findByIdAndUpdate(q, { // Définir les variables de son article

            // Schéma par défaut
            ...req.body,

        }, (err) => {
            if (err) console.log(err); // Si il y a une erreur, l'afficher
            // sinon rediriger sur la page "author"
            res.render('author', {
                comments: dbComments
            })

        })
    },

    // Suppression commentaire
    deleteComments: async (req, res) => {

        const q = req.params.id

        const dbComments = await Comments.findById(req.params.id)
        console.log(dbComments)

        Comments.deleteOne({
            _id: req.params.id // Toujours définir l'ID
        }, (err) => {
            if (!err) return res.redirect('/author') // Rediriger vers la page "author"
            else res.send(err) // Sinon afficher l'érreur
        })
    }
}