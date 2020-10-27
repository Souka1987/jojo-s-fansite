/*
 * Controller Page Arcs et News Home
 * ********************************** */

const multer = require('multer');
const path = require('path');
const News = require('../../database/models/News');
const fs = require('fs');



module.exports = {

    // POST Action du formulaire newsAdd( Admin )
    newsAdd: async (req, res) => {

        console.log('Controller form add news')
        // console.log(req)

        console.log(req.file)
        // Demander de charger le model "Arcs"
        const dbNews = await News.find({})

        console.log(req.body)
        console.log(dbNews)
        // console.log(image)


        // Définir le fichier image
        const image = req.file.originalname

        // Création de l'article à partir du model
        News.create({

            // ...req.body prend tout le schéma par défaut
            ...req.body,

            image: `/assets/images/arcs/${image}`,
            imageName: req.file.originalname,
            name: req.body.name,

        }, (err) => {
            if (err) console.log(err)

            res.redirect('/')
        })

    },

    // GET Page du formulaire édition de Arcs ( Admin )
    editFormNews: async (req, res) => {
        const articleID = await News.findById(req.params.id)
        console.log(articleID)
        res.render('admin/news/editNews', {
            article: articleID
        })
    },

    // POST Modifier l'article
    // Syncroniser l"url "/" avec la base de données avec la méthode "async"
    editNews: async (req, res) => {
        const q = req.params.id


        // Récupération l'article grace au params.id
        const articleID = await News.findById(req.params.id)
        const image = req.file.originalname

        console.log(req.body)
        console.log(req.file)
        console.log(image)

        // Pour modifier l'image
        News.findByIdAndUpdate(q, { // Définir les variables de son article

            // Schéma par défaut
            ...req.body,
            // Aller chercher le chemin de l'image à modifier
            image: `assets/images/arcs/${image}`,
            name: req.body.name

        }, (err) => {
            if (err) console.log(err); // Si il y a une erreur, l'afficher
            res.redirect('/') // sinon renvoyer sur la page "home"

        })
    },

    // GET Pour supprimer un article
    deleteNews: async (req, res) => {
        const articleID = await News.findById(req.params.id)
        console.log('Controller Delete One Article')
        console.log(articleID)

        // Effacer l'image depuis le dossier source "public"
        fs.unlink(`public/images/arcs/${articleID.imageName}`, (err) => {
            /*la méthode "fs.unlink" sert à effacer un fichier
                    depuis le dossier ciblé*/

            /*après avoir défini la suppression procéder à la suppression de l'article entier en ne 
            ciblant que son id*/

            if (err) return console.log(err)
            News.deleteOne({ // Pour suprimer un document à la fois par son ID
                _id: req.params.id // Toujours définir l'ID
            }, (err) => {
                if (!err) return res.redirect('/') // Rediriger vers la page "home"
                else res.send(err) // Sinon afficher l'érreur
            })
        })

    }
}