/*
 * Controller Page Admin
 * ********************************** */

const path = require('path');
const Character = require('../../database/models/Character');
const Powers = require('../../database/models/Powers');
const News = require('../../database/models/News');
const Manga = require('../../database/models/Manga');
const Arcs = require('../../database/models/Arcs')

module.exports = {
    get: async (req, res) => {

        const dbManga = await Manga.find({}),
            dbNews = await News.find({}),
            dbArcs = await Arcs.find({}),
            dbCharacter = await Character.find({}),
            dbPowers = await Powers.find({})

        res.render('admin', { // "res.render", rend une vue
            arcs: dbArcs,
            news: dbNews,
            manga: dbManga,
            character: dbCharacter,
            power: dbPowers

        })

    }
}