/*
 * Controller Page Home
 * ********************************** */

const multer = require('multer');
const path = require('path');
const Arcs = require('../../database/models/Arcs');
const News = require('../../database/models/News');
const User = require('../../database/models/User')



module.exports = {

    // GET Page home Arcs + ajout des news ( Utilisateur )
    getArcs: async (req, res) => {
        // Ci-dessous, syntax permetant d'attendre le retour de la requête + "schema.find({})" pour afficher le contenu de la base de données.
        const dbArcs = await Arcs.find({}),
            dbNews = await News.find({})
            
            // const sess = req.session
            // console.log(sess)

        // console.log(posts)

        res.render('index', { // "res.render", rend une vue
            arcs: dbArcs,
            news: dbNews
            // sess: sess

        })
    }, 

    // GET Page du formulaire création des Arcs ( Admin )
    arcsPageFormAdd: (req, res) => {
        res.render('admin/arcs/arcsAdd')
    },

    // GET Page du formulaire création des News ( Admin )
    newsFormAdd: (req, res) => {
        res.render('admin/news/newsAdd')
    },
}