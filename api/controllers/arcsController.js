const Arcs = require('../../database/models/Arcs')

module.exports = {
    // POST Action du formulaire AddArcs( Admin )
    addArcs: async (req, res) => {

        console.log('Controller form add arcs')
        // console.log(req)

        console.log(req.file)
        const dbArcs = await Arcs.find({})

        // const {
        //     image
        // } = req.file

        console.log(req.body)
        // console.log(dbArcs)
        // console.log(image)


        Arcs.create({

            name: req.body.name,
            content: req.body.content,
            image: req.file.fieldname

        }, (err) => {
            if (err) console.log(err)
            res.render('index', {
                arcs: dbArcs
            })

        })
    }
}