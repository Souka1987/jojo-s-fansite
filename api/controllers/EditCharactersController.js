/*
 * Controller Page Edition Personnages 
 * ********************************** */

const path = require('path');
const Character = require('../../database/models/Character');


module.exports = {
   
    // GET Page du formulaire édition de Characters ( Admin )
    formEditCharacter: async (req, res) => {
        res.render('/admin/character/editCharacters')
    },

    // POST Modifier l'article
    EditCharacters: async (req, res) => {
        // On définie la variable dbModel avec un condition qui dit
        // Que l'on veux selection l'Obj Model qui est le même _id
        // Que l'ID envoyer par l'URL
        const dbCharacter = await Character.findById(req.params.id)
        // Définition de l' _id a selectionner avec l' _id envoyer
        let query = {
            _id: req.params.id
        }
        // Log de nos infos
        console.log('test Édition / ' + req.params.id + '\n' + req.body.name + " / " + req.body.content)
        // On demande la function findOneAndUpdate de MongoDB
        Character.findOneAndUpdate(
            // On utilise notre Variable query pour modifier notre Obj grace à _id
            query, {
                // Sélection de nos variable a modifier avec la requète de notre formulaire
                name: req.body.name,
                content: req.body.content
            },
            // Config récentes de MongoDB
            {
                useFindAndModify: false
            },
            // Notre Fonction de gestion de l'err et Post du nouvel Obj
            function (err, post) {
                // Si il y une err il fait ça
                if (err) {
                    // Log Err
                    console.log('Err: ' + err)
                    // Redirection
                    res.redirect('/')
                    // Sinon si il n'y a pas d' erreur tu fais ça 
                } else {
                    // création de l'Obj avec les nouvelle data
                    Character.findOneAndUpdate({
                            // Récupération du req.body
                            ...req.body
                        },
                        // Log
                        console.log('Modification OK'),
                        // Redirection
                        res.redirect('characters')
                    )
                }
            }
        )
    }
}