/*
 * Controller Messages
 * ********************************** */

const Message = require('../../database/models/Message'),
    path = require('path')

module.exports = {
    get: async (req, res) => {
        // Rechercher dans la database
        const dbMessage = await Message.find({})
        // Afficher les datas
        res.render('message', {
            message: dbMessage
        })
    },
}