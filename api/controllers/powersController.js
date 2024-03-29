/*
 * Controller Page Powers
 * ********************************** */

const path = require("path"),
  fs = require("fs"),
  Powers = require("../../database/models/Powers"),
  Character = require("../../database/models/Character");

module.exports = {
  // GET page du formulaire création de powers ( Admin )
  powersPageFormAdd: async (req, res) => {
    //    MISE EN RELATION AVEC la propriété "populate() de mongoose"
    Powers.find({})
      .populate("characters")
      .exec((err, data) => {
        if (err) console.log(err);
        console.log(data);
        res.render("powers", {
          // "res.render", rend une vue.
          powers: data,
        });
      });

    const dbPowers = await Powers.find({}),
      dbCharacter = await Character.find({});
    res.render("admin/powers/powersAdd", {
      powers: dbPowers,
      character: dbCharacter,
    });
  },

  powersAdd: (req, res) => {
    console.log(req.file);
    console.log(req.body);
    // Définir le fichier image
    const image = req.file.originalname;
    Powers.create(
      {
        ...req.body,

        // Aller chercher le dossier dans lequel les images seront stockées
        image: `/assets/images/characters/${image}`,
        imageName: req.file.originalname,
        name: req.body.name,
      },
      (err) => {
        if (err) console.log(err);
        res.redirect("/admin");
      }
    );
  },

  powersPageFormEdit: async (req, res) => {
    const dbPowers = await Powers.find({});
    console.log(dbPowers);
    res.render("admin/powers/powersEdit", {
      powers: dbPowers,
    });
  },

  // // POST Modifier l'article
  // // Syncroniser l"url "/" avec la base de données avec la méthode "async"
  powersEdit: async (req, res) => {
    const q = req.params.id;

    // Récupération l'article grâce au params.id
    const dbPowers = await Powers.findById(req.params.id);

    console.log(req.body);
    console.log(req.file);

    const image = req.file.originalname;
    // Pour modifier l'image
    Powers.findByIdAndUpdate(
      q,
      {
        // Demander de chercher la variable selon son ID afin que celui-ci soit modifier

        // Récupérer le schéma par défaut
        ...req.body,
        // Aller chercher le chemin de l'image à modifier
        image: `assets/images/characters/${image}`,
        name: req.body.name,
      },
      (err) => {
        if (err) console.log(err); // Si il y a une erreur, l'afficher
        res.redirect("/admin"); // Sinon rediriger sur la page "admin"
      }
    );
  },

  // GET Pour supprimer un article
  deletePowers: async (req, res) => {
    const dbPowers = await Powers.findById(req.params.id);
    console.log("Controller Delete One Article");
    console.log(dbPowers);

    // Effacer l'image depuis le dossier source "public"
    fs.unlink(`public/images/characters/${dbPowers.imageName}`, (err) => {
      /*la méthode "fs.unlink" sert à effacer un fichier
                    depuis le dossier ciblé*/

      /* Procéder à la suppression de l'article entier en ne 
            ciblant que son id*/

      if (err) return console.log(err);
      Powers.deleteOne(
        {
          // Supprimer un document à la fois par son ID
          _id: req.params.id, // Chercher l'url du "power" en question
        },
        (err) => {
          if (!err) return res.redirect("/admin");
          // Rediriger vers la page "admin"
          else res.send(err); // Sinon afficher l'érreur
        }
      );
    });
  },
};
