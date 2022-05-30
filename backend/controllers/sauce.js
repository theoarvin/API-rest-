// importation du model de la base de données 
const dotenv = require("dotenv");
dotenv.config();

const Sauce = require('../models/Sauce');


exports.getAllSauces = (req, res, next) => {
        Sauce.find()
          .then((sauce) => res.status(200).json(sauce))
          .catch((error) => res.status(404).json({ error }));
 };


      
