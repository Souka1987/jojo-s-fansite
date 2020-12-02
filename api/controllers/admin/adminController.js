/*
 * Controller Page Admin
 * ********************************** */
const $ = require('jquery')

const News = require('../../../database/models/News'),
    Arcs = require('../../../database/models/Arcs'),
    Character = require('../../../database/models/Character'),
    Powers = require('../../../database/models/Powers'),
    Manga = require('../../../database/models/Manga'),
    User = require('../../../database/models/User'),
    Comments = require('../../../database/models/Comments')


module.exports = {
    get: async (req, res) => {
        // Récupération des datas dans la database
        const dbNews = await News.find({}),
            dbArcs = await Arcs.find({}),
            dbCharacter = await Character.find({}),
            dbPowers = await Powers.find({}),
            dbManga = await Manga.find({}),
            dbUser = await User.find({}),
            dbComments = await Comments.find({})
        res.render('admin', {
            // Affiche des datas dans la page Admin
            layout: 'adminLayout',
            news: dbNews,
            arcs: dbArcs,
            character: dbCharacter,
            powers: dbPowers,
            manga: dbManga,
            users: dbUser,
            comments: dbComments
        })
    }
}