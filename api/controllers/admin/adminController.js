/*
 * Controller Page Admin
 * ********************************** */

const News = require('../../../database/models/News'),
    Arcs = require('../../../database/models/Arcs'),
    Character = require('../../../database/models/Character'),
    Powers = require('../../../database/models/Powers'),
    Manga = require('../../../database/models/Manga')

module.exports = {
    get: async (req, res) => {
        const dbNews = await News.find({}),
            dbArcs = await Arcs.find({}),
            dbCharacter = await Character.find({}),
            dbPowers = await Powers.find({}),
            dbManga = await Manga.find({})
        res.render('admin', {
            layout: 'adminLayout',
            news: dbNews,
            arcs: dbArcs,
            character: dbCharacter,
            powers: dbPowers,
            manga:dbManga
        })
    }
}

