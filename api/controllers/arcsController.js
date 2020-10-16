/*
 * Controller Page Arcs Home
 * ********************************** */

const Arcs = require('../../database/models/Arcs')


module.exports = {
    // POST Action du formulaire AddArcs( Admin )
    addArcs: async (req, res) => {

        console.log('Controller form add arcs')
        // console.log(req)

        console.log(req.file)
        // Demander de charger le model "Arcs"
        const dbArcs = await Arcs.find({})

        console.log(req.body)
        // console.log(dbArcs)
        //console.log(image)

        // Définir le fichier image
        const image = req.file.originalname

        // Création de l'article à partir du model
        Arcs.create({

            // ...req.body prend par défaut tout le schéma
            ...req.body,

            image: `/assets/images/arcs/${image}`,
            name: req.body.name

        }, (err) => {
            if (err) console.log(err)
            // Recharger la page automatiquement après création avec "res.redirect"
            res.render('index')
        })
    }
}