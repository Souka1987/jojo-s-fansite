/*
 * Controller Page Manga
 * ********************************** */

const path = require('path'),
    Manga = require('../../database/models/Manga'),
    Arcs = require('../../database/models/Arcs'),
    fs = require('fs'),
    format = require('date-format')


module.exports = {
    /*GET Page website Manga ( Utilisateur ) + 
    ajout des saisons pour la navigation avec la navtabs*/

    getManga: async (req, res) => {
        // Recherche dans la database par saisons
        const dbManga = await Manga.find({}),
            dbMangaSeason1 = await Manga.find({
                season: 1
            }),
            dbMangaSeason2 = await Manga.find({
                season: 2
            })
        res.render('manga', { // rend une vue + récupération des datas
            manga: dbManga,
            season1: dbMangaSeason1,
            season2: dbMangaSeason2
        })
    },


    // GET Page du formulaire creation de Manga ( Admin )
    mangaFormAdd: async (req, res) => {

        const dbManga = await Manga.find({}),
            dbArcs = await Arcs.find({})

        res.render('admin/manga/mangaAdd', {
            manga: dbManga,
            arcs: dbArcs
        })
    },

    // POST Action du formulaire characterAdd ( Admin )
    mangaAdd: async (req, res) => {

        console.log('Controller form add manga')
        // Demander de charger le model "Manga"
        const dbManga = await Manga.find({})

        console.log(req.body)
        console.log(dbManga)
        console.log(req.file)
        // Définir le fichier image
        const image = req.file.originalname

        // Création de l'article à partir du model
        Manga.create({

            // Ici on travail une date qui ce retrouve au format 'String'
            releaseDate: format.asString('le dd/MM/yyyy à hh:mm:ss', new Date()),
            // ...req.body prend par défaut tout le schéma
            ...req.body,

            // Aller chercher le dossier dans lequel les images seront stockées
            image: `/assets/images/arcs/${image}`,
            imageName: req.file.originalname,
            name: req.body.name

        }, (err) => {
            if (err) console.log(err)
            // Recharger la page automatiquement après création avec "res.redirect"
            res.redirect('/manga')

        })
    },

    // GET Page du formulaire édition de Characters ( Admin )
    editFormManga: async (req, res) => {
        const dbManga = await Manga.findById(req.params.id),
            dbArcs = await Arcs.find({})

        console.log(dbManga)
        res.render('admin/manga/editManga', {
            manga: dbManga,
            arcs: dbArcs
        })
    },

    // POST Modifier l'article
    // Syncroniser l"url "/" avec la base de données avec la méthode "async"
    editManga: async (req, res) => {
        const q = req.params.id


        // Récupération l'article grace au params.id
        const dbManga = await Manga.findById(req.params.id)
        const image = req.file.originalname

        console.log(req.body)
        console.log(req.file)

        // Pour modifier l'image
        Manga.findByIdAndUpdate(q, { // Définir les variables de son article

            // Schéma par défaut
            ...req.body,
            // Aller chercher le chemin de l'image à modifier
            image: `assets/images/arcs/${image}`,
            name: req.body.name,
            tome: req.body.tome

        }, (err) => {
            if (err) console.log(err); // Si il y a une erreur, l'afficher
            res.redirect('/manga') // sinon rediriger sur la page "manga"

        })
    },

    // GET Pour supprimer un article
    deleteManga: async (req, res) => {
        const dbManga = await Manga.findById(req.params.id)
        console.log('Controller Delete One Article')
        console.log(dbManga)

        // Effacer l'image depuis le dossier source "public"
        fs.unlink(`public/images/arcs/${dbManga.imageName}`, (err) => {
            /*la méthode "fs.unlink" sert à effacer un fichier
                    depuis le dossier ciblé*/

            /*après avoir défini la suppression procéder à la suppression de l'article entier en ne 
            ciblant que son id*/

            if (err) return console.log(err)
            Manga.deleteOne({ // Pour suprimer un document à la fois par son ID
                _id: req.params.id // Toujours définir l'ID
            }, (err) => {
                if (!err) return res.redirect('/admin') // Rediriger vers la page "manga"
                else res.send(err) // Sinon afficher l'érreur
            })
        })

    }
}