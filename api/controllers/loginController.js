/*
 * Controller Page Login
 * ********************************** */

module.exports = {
    // GET Page website login ( Utilisateur )
    getUsers: async (req, res) => {
        res.render('login')
    }

}