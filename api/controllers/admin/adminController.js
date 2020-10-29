/*
 * Controller Page Admin
 * ********************************** */
const News = require('../../../database/models/News'),
    Arcs = require('../../../database/models/Arcs'),
    Character = require('../../../database/models/Character'),
    Powers = require('../../../database/models/Powers')

module.exports = {
    get: async (req, res) => {
        const dbNews = await News.find({}),
            dbArcs = await Arcs.find({}),
            dbCharacter = await Character.find({}),
            dbPowers = await Powers.find({})
        res.render('admin', {
            news: dbNews,
            arcs: dbArcs,
            character: dbCharacter,
            powers: dbPowers
        })
    }
}

