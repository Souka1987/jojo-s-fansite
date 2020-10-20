const multer = require('multer')
const path = require('path')
const Arcs = require('../../database/models/Arcs')


module.exports = {

    // GET Page home Arcs ( Utilisateur )
    getArcs: async (req, res) => {
        // Ci-dessous, syntax permetant d'attendre le retour de la requête + "article.find({})" pour afficher le contenu de la database.
        const dbArcs = await Arcs.find({})

        // console.log(posts)

        res.render('index', { // "res.render", rend une vue
            arcs: dbArcs
        })
    },

    // GET Page du formulaire creation des Arcs ( Admin )
    formAddArcs: (req, res) => {
        res.render('admin/arcs/arcsAdd')
    }
    
}