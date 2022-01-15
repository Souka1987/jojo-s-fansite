// Import du module
const mongoose = require("mongoose"),
  Article = require("../database/models/Article");

mongoose.Promise = global.Promise;

// Configuration avec mongoose
mongoose.connect(
  "mongodb+srv://suka:Suka20@jjba.vugld.mongodb.net/jjba?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  }
);

// Connexion avec mongoose
mongoose.connection
  .once("open", (done) => console.log("mongoose connected !!"))
  .on("error", (error) => {
    console.warn("Error : ", error);
  });

// //Supprime le contenu de article
beforeEach((done) => {
  mongoose.connection.collections.articles.drop(() => {
    done();
  });
});
