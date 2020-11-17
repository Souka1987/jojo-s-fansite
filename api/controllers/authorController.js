const Comments = require("../../database/models/Comments")

module.exports = {
    get: async (req, res) => {
        res.render('author')
    },
}