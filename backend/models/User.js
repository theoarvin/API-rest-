const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
// création du modèle de données pour le login
const userShema = mongoose.Schema({
    email: { type: String, required : true, unique: true },
    password: { type: String, required: true }
});

userShema.plugin(uniqueValidator);

// exportation du modèle de données 
module.exports = mongoose.model('User', userShema);