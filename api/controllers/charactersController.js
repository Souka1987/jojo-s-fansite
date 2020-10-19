/*
 * Controller Page Personnages
 * ********************************** */

const path = require('path');
const Character = require('../../database/models/Character');

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
    }
}