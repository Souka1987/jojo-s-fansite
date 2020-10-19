/*
 * Controller Page Personnages
 * ********************************** */

const path = require('path');
const Character = require('../../database/models/Character');
const fs = require('fs')

module.exports = {
    // GET Page website Characters ( Utilisateur )
    getCharacters: async (req, res) => {
        const dbCharacter = await Character.find({})

        // Demander de rendre la page "characters"
        res.render('characters', {
            character: dbCharacter
        })
    },

    // GET Page du formulaire creation de Characters ( Admin )
    formAddCharacter: (req, res) => {
        res.render('admin/character/characterAdd')
    },


    // POST Action du formulaire characterAdd ( Admin )
    CharacterAdd: async (req, res) => {

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
            name: req.body.name

        }, (err) => {
            if (err) console.log(err)
            // Recharger la page automatiquement après création avec "res.redirect"
            res.redirect('/characters')

        })
    },

    // GET Page du formulaire édition de Characters ( Admin )
    pageFormEditCharacter: async (req, res) => {
        const articleID = await Character.findById(req.params.id)
        console.log(articleID)
        res.render('admin/character/editCharacters', {
            article: articleID
        })
    },

    // POST Modifier l'article
    //syncroniser l"url "/" avec la base de données avec la méthode "async"
    editCharacters: async (req, res) => {
        const q = req.params.id


        // Récupération l'article grace au params.id
        const articleID = await Character.findById(req.params.id)
        const image = req.file.originalname

        console.log(req.body)
        console.log(req.file)

        // Pour modifier l'image
        Character.findByIdAndUpdate(q, { //Définir les variables de son article

                // Schéma par défaut
                ...req.body,
                // Aller chercher le chemin de l'image à modifier
                image: `assets/images/characters/${image}`,
                name: req.body.name

            }, (err) => {
                if (err) console.log(err); //Si il y a une erreur, l'afficher
                res.redirect('/characters') //sinon renvoyer sur la page d'édition

            },
        )
    },

    // GET Pour supprimer un article
    deleteCharacters: async (req, res) => {
        const articleID = await Character.findById(req.params.id)
        console.log('Controller Delete One Article')//Toujours voir si cela fonction avec le console.log
        console.log(articleID)
        const image = req.file.originalname


        fs.unlink(`assets/images/characters/${image}`, (err) => {/*la méthode "fs.unlink" sert à effacer un fichier
        depuis le dossier ciblé*/
    
        /*après avoir défini la suppression procéder à la suppression de l'article entier en ne 
        ciblant que son id*/
    
            if (err) return console.log(err)
            Character.deleteOne({//pour suprimer un document à la fois par son ID
                    _id: req.params.id//tjs définir l'ID
                }, (err) => {
                    if (!err) return res.redirect('/characters')//si il n'y a pas d'érreur rediriger vers la page d'acceuil
                    else res.send(err) //sinon afficher l'érreur
                })
        })
    
    }
}