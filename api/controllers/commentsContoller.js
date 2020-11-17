const Comments = require('../../database/models/Comments')


module.exports = {
    // Method get (Récupération)
    getComments: async (req, res) => {

        // Définir result
        const result = req.body
        // Chercher les commentaires dans la base de données, les afficher sous forme de tableau (Array)
        const dbComments = await Comments.find({})

        // S'il y en a pas, renvoyer sur la page auteur
        res.render('author', {
            // Afficher le résultat de la liste de commantaires
            commentList: result
        });
        console.log('Comment list');
    },



    // Method Post
    postComments: async (req, res) => {
        
        // Définir result
        const result = req.body

        console.log(req.body);
        // Ajouter un commentaire
        Comments.create(req.body, (err) => {
            // voir si il n'y a pas d'erreur
            if (err) {
                console.log(err);
                throw err;
            }
        })
        // Aller chercher les commentaires dans la dase de données
        const dbComments = await Comments.find({})

        // Renvoyer à la page 'auteur'
        res.render('author', {
            commentList: result
        });
        console.log('Commentaire ajouté');
    }

}