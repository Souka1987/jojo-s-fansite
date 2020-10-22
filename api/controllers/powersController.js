/*
 * Controller Page Powers
 * ********************************** */

const path = require('path');
const fs = require('fs');
const Powers = require('../../database/models/Powers')

module.exports= {
    // GET page du formulaire création de powers ( Admin )
    powersPageFormAdd: (req, res) => {
        res.render('admin/powers/powersAdd')
    },
    powersAdd: (req, res) => {
        console.log(req.body)
        Powers.create({...req.body}, (err) => {
            if(err) console.log(err)
            res.redirect('/characters')
        })
    },


}