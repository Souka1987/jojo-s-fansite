/*
 * Controller Page Admin
 * ********************************** */
const News = require('../../../database/models/News'),
    Arcs = require('../../../database/models/Arcs')

module.exports = {
    get: async (req, res) => {
        const dbNews = await News.find({}),
            dbArcs = await Arcs.find({})
        res.render('admin', {
            article: dbNews,
            arcs: dbArcs
        })
    }
}



// const Character = require('../../../database/models/Character'),
//     Powers = require('../../../database/models/Powers'),
//     News = require('../../../database/models/News'),
//     Manga = require('../../../database/models/Manga'),
//     Arcs = require('../../../database/models/Arcs')

// module.exports = {
//     get: async (req, res) => {
//         const dbManga = await Manga.find({}),
//             dbNews = await News.find({}),
//             dbArcs = await Arcs.find({}),
//             dbCharacter = await Character.find({}),
//             dbPowers = await Powers.find({})

//         res.render('admin', { // "res.render", rend une vue
//             layout: "adminLayout",
//             arcs: dbArcs,
//             news: dbNews,
//             manga: dbManga,
//             character: dbCharacter,
//             power: dbPowers

//         })

//     }
// }