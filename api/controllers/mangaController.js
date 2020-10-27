/*
 * Controller Page Manga
 * ********************************** */

const path = require('path');
const News = require('../../database/models/News');
const Manga = require('../../database/models/Manga');
const fs = require('fs')


module.exports = {
    // GET Page website Manga ( Utilisateur )
    getManga: async (req, res) => {
        const dbManga = await Manga.find({})

        // Demander de rendre la page "characters"
        res.render('manga', { // "res.render", rend une vue.
            manga: dbManga
        })
    },

    // GET Page du formulaire creation de Manga ( Admin )
    mangaFormAdd: (req, res) => {
        res.render('admin/manga/mangaAdd')
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
        const articleID = await Manga.findById(req.params.id)
        console.log(articleID)
        res.render('admin/manga/editManga', {
            article: articleID
        })
    },

    // POST Modifier l'article
    // Syncroniser l"url "/" avec la base de données avec la méthode "async"
    editManga: async (req, res) => {
        const q = req.params.id


        // Récupération l'article grace au params.id
        const articleID = await Manga.findById(req.params.id)
        const image = req.file.originalname

        console.log(req.body)
        console.log(req.file)

        // Pour modifier l'image
        Manga.findByIdAndUpdate(q, { //Définir les variables de son article

            // Schéma par défaut
            ...req.body,
            // Aller chercher le chemin de l'image à modifier
            image: `assets/images/arcs/${image}`,
            name: req.body.name

        }, (err) => {
            if (err) console.log(err); // Si il y a une erreur, l'afficher
            res.redirect('/manga') // sinon rediriger sur la page "manga"

        })
    },

    // GET Pour supprimer un article
    deleteManga: async (req, res) => {
        const articleID = await Manga.findById(req.params.id)
        console.log('Controller Delete One Article')
        console.log(articleID)

        // Effacer l'image depuis le dossier source "public"
        fs.unlink(`public/images/arcs/${articleID.imageName}`, (err) => {
            /*la méthode "fs.unlink" sert à effacer un fichier
                    depuis le dossier ciblé*/

            /*après avoir défini la suppression procéder à la suppression de l'article entier en ne 
            ciblant que son id*/

            if (err) return console.log(err)
            Manga.deleteOne({ // Pour suprimer un document à la fois par son ID
                _id: req.params.id // Toujours définir l'ID
            }, (err) => {
                if (!err) return res.redirect('/manga') // Rediriger vers la page "characters"
                else res.send(err) // Sinon afficher l'érreur
            })
        })

    }
}