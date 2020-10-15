/*
 * Controller Page Personnages
 * ********************************** */
const path = require('path');
const Character = require('../../database/models/Character')

module.exports = {
    // GET Page website Characters ( Utilisateur )
    getCharacters: async (req, res) => {
        const dbCharacter = await Character.find({})

        res.render('characters', {
            character: dbCharacter
        })
    },

    // GET Page du formulaire creation de Characters ( Admin )
    formAddCharacter: (req, res) => {
        res.render('admin/character/characterAdd')
    },

    // POST Action du formulaire AddCharacters ( Admin )
    addCharacters: async (req, res) => {

        console.log('Controller form add character')

        const dbCharacter = await Character.find({})

        console.log(req.body)
        console.log(dbCharacter)

        Character.create({
            
            name: req.body.name,
            content: req.body.content

        }, (err) => {
            if (err) console.log(err)
            res.render('characters', {
                character: dbCharacter
            })
            
        })
    }
}