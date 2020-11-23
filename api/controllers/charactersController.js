/*
 * Controller Page Characters
 * ********************************** */

const path = require('path'),
    Character = require('../../database/models/Character'),
    Powers = require('../../database/models/Powers'),
    fs = require('fs')

module.exports = {
    // GET Page website Characters ( Utilisateur )
    getCharacters: (req, res) => {

        //    MISE EN RELATION AVEC la propriété "populate() de mongoose"
        Character.find({})
            .populate('powers')
            .exec((err, data) => {
                if (err) console.log(err)
                console.log(data)
                res.render('characters', { // "res.render", rend une vue.
                    character: data
                })
            })
    },

    // GET Page du formulaire création de Characters ( Admin )
    /* Ci-dessous, syntax permetant d'attendre le retour de la requête + "schema.find({})" 
           pour afficher le contenu de la base de données.*/
    formAddCharacter: async (req, res) => {
        const dbCharacter = await Character.find({}),
            dbPowers = await Powers.find({})

        res.render('admin/character/characterAdd', {
            character: dbCharacter,
            powers: dbPowers

        })
    },

    // POST Action du formulaire characterAdd ( Admin )
    characterAdd: async (req, res) => {

        console.log('Controller form add character')
        // Demander de charger le model "character"
        const dbCharacter = await Character.find({})

        console.log(req.body)
        console.log(dbCharacter)
        console.log(req.file)
        // Définir le fichier image
        const image = req.file.originalname

        // Création de l'article à partir du model
        Character.create({
            // ...req.body prend par défaut tout le schéma
            ...req.body,

            // Aller chercher le dossier dans lequel les images seront stockées
            image: `/assets/images/characters/${image}`,
            imageName: req.file.originalname,
            name: req.body.name

        }, (err) => {
            if (err) console.log(err)
            // Recharger la page automatiquement après création avec "res.redirect"
            res.redirect('/characters')

        })
    },

    // GET Page du formulaire édition de Characters ( Admin )
    pageFormEditCharacter: async (req, res) => {
        const dbCharacter = await Character.findById(req.params.id)
        const dbPowers = await Powers.find({})

        console.log(articleID)
        res.render('admin/character/editCharacters', {
            character: dbCharacter,
            powers: dbPowers,

        })
    },

    // POST Modifier l'article
    // Syncroniser l"url "/" avec la base de données avec la méthode "async"
    editCharacters: async (req, res) => {
        const q = req.params.id

        // Récupération de l'article grace au params.id
        const dbCharacter = await Character.findById(req.params.id)

        console.log(req.body)
        console.log(req.file)

        if (!req.file) {
            // Pour modifier l'image
            Character.findByIdAndUpdate(q, { // Définir les variables de son article

                // Schéma par défaut
                ...req.body

            }, (err) => {
                if (err) console.log(err); // Si il y a une erreur, l'afficher
                res.redirect('/characters') // Sinon renvoyer sur la page "characters"

            })
        } else {
            const image = req.file.originalname
            // Pour modifier l'image
            Character.findByIdAndUpdate(q, { // Définir les variables de son article

                // Schéma par défaut
                ...req.body,
                // Aller chercher le chemin de l'image à modifier
                image: `assets/images/characters/${image}`,
                name: req.body.name

            }, (err) => {
                if (err) console.log(err); //Si il y a une erreur, l'afficher
                res.redirect('/characters') //sinon renvoyer sur la page "characters"

            })
        }
    },

    // GET Pour supprimer un article
    deleteCharacters: async (req, res) => {
        const dbCharacter = await Character.findById(req.params.id)
        console.log('Controller Delete One Article')
        console.log(dbCharacter)

        // Effacer l'image depuis le dossier source "public"
        fs.unlink(`public/images/characters/${dbCharacter.imageName}`, (err) => {
            /*la méthode "fs.unlink" sert à effacer un fichier
                    depuis le dossier ciblé*/

            /* Procéder à la suppression de l'article entier en ne 
            ciblant que son id*/

            if (err) return console.log(err)
            Character.deleteOne({ // Pour suprimer un document à la fois par son ID
                _id: req.params.id // Toujours définir l'ID
            }, (err) => {
                if (!err) return res.redirect('/characters') // Rediriger vers la page "characters"
                else res.send(err) // Sinon afficher l'érreur
            })
        })

    }
}