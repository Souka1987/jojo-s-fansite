module.exports = {
    get: async( req, res) => {
        res.render('admin', {
            layout: 'adminLayout'
        })
    },
    getUsers: async( req, res) => {
        res.render('admin/users', {
            layout: 'adminLayout'
        })
    },
    getSettings: async(req, res) => {
        res.render('admin/settings', {
        layout: 'adminLayout' 
    })
    }
}