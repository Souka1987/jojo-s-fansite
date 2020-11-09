/*
 * Controller Page Home
 * ********************************** */

const multer = require('multer');
const path = require('path');
const Arcs = require('../../database/models/Arcs');
const News = require('../../database/models/News');




module.exports = {

    // GET Page home Arcs + ajout des news ( Utilisateur )
    getArcs: async (req, res) => {


        //  MISE EN RELATION AVEC la propriété "populate() de mongoose"
        News.find({})
            .populate('arcs')
            .exec((err, data) => {
                if (err) console.log(err)
                console.log(data)
                res.render('index', { // "res.render", rend une vue.
                    news: data
                })
            })
    },


    // GET Page du formulaire création des Arcs ( Admin )
    arcsPageFormAdd: async (req, res) => {

        const dbArcs = await Arcs.find({})
        res.render('admin/arcs/arcsAdd', {
            arcs: dbArcs
        })
    },

    // GET Page du formulaire création des News ( Admin )
    newsFormAdd: async (req, res) => {

        const dbArcs = await Arcs.find({}),
        dbNews = await News.find({})
        res.render('admin/news/newsAdd', {
            arcs: dbArcs,
            news:dbNews
        })
    },
}