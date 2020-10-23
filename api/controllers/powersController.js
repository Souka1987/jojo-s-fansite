/*
 * Controller Page Powers
 * ********************************** */

const path = require('path');
const fs = require('fs');
const Powers = require('../../database/models/Powers');


module.exports = {
    // GET page du formulaire création de powers ( Admin )
    powersPageFormAdd: async (req, res) => {
        const dbPowers = await Powers.find({})
        res.render('admin/powers/powersAdd', {
            powers: dbPowers,
        })
    },

    powersAdd: (req, res) => {
        console.log(req.file);
        console.log(req.body)

        // Définir le fichier image
        const image = req.file.originalname
        Powers.create({

            ...req.body,

            // Aller chercher le dossier dans lequel les images seront stockées
            image: `/assets/images/arcs/${image}`,
            imageName: req.file.originalname,
            name: req.body.name

        }, (err) => {
            if (err) console.log(err)
            res.redirect('/characters')
        })
    },

    powersPageFormEdit: async (req, res) => {
        const dbPowers = await Powers.find({})
        console.log(dbPowers)
        res.render('admin/powers/powersEdit', {
            powers: dbPowers,
        
        })
    },

    // POST Modifier l'article
    // Syncroniser l"url "/" avec la base de données avec la méthode "async"
    powersEdit: async (req, res) => {
        const q = req.params.id

        // Récupération l'article grace au params.id
        const dbPowers = await Powers.findById(req.params.id)

        console.log(req.body)
        console.log(req.file)

        const image = req.file.originalname
        // Pour modifier l'image
        Powers.findByIdAndUpdate(q, { // Définir les variables de son article

            // Schéma par défaut
            ...req.body,
            // Aller chercher le chemin de l'image à modifier
            image: `assets/images/arcs/${image}`,
            name: req.body.name

        }, (err) => {
            if (err) console.log(err); // Si il y a une erreur, l'afficher
            res.redirect('/characters') // sinon rediriger sur la page "characters"

        })
    }


    // deleteOne: async (req, res) => {
    //     const dbCharactersRelation = await Character.find({powers: req.params.id}) 
    //     console.log(dbCharactersRelation)
    // }

}