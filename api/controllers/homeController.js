/*
 * Controller Page Home
 * ********************************** */

const multer = require('multer'),
    path = require('path'),
    Arcs = require('../../database/models/Arcs'),
    News = require('../../database/models/News'),
    // Sauvegarde
    Cron = require('cron').CronJob


module.exports = {
    // GET Page home Arcs + ajout des news ( Utilisateur )
    getArcs: async (req, res) => {
        //   Backup, tâche qui se répète toutes les minutes
        var jobMinute = new Cron('1 * * * * *', () => {
            console.log('Cette tache se répète toutes les minutes');
        }, null, true, 'America/Los_Angeles');
        jobMinute.start();

        // Backup, tâche qui se répète tous les jours voulus
        var jobThursday = new Cron('* 2 14 20 4 *', () => {
            console.log('Sauvegarde OK ce jour');
        }, null, true, 'America/Los_Angeles');
        jobThursday.start();


        const dbArcs = await Arcs.find({}),
            dbNews = await News.find({})
        res.render('index', {
            arcs: dbArcs,
            news: dbNews
        }) // "res.render", rend une vue.
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

        const dbNews = await News.find({})
        res.render('admin/news/newsAdd', {
            news: dbNews
        })
    },
}