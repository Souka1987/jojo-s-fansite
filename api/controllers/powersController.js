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
         

            console.log(dbPowers)

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
    }





    // deleteOne: async (req, res) => {
    //     const dbCharactersRelation = await Character.find({powers: req.params.id}) 
    //     console.log(dbCharactersRelation)
    // }

}