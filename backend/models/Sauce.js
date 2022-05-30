const mongoose = require('mongoose');

const sauceShema = mongoose.Schema({
    userId: { type: String, required: true},
    name: { type: String, required: true},
    manufacturer: { type: String, required: true},
    description: { type: String, required: true},
    mainPepper: { type: String, required: true},
    imageUrl : { type: String, required: true},
    heat: { type: String, required: true},
    likes: { type: String, required: true},
    dislikes: { type: String, required: true},
    usersLiked: { type: String, required: true},
    usersDisliked: { type: String, required: true}
});

// exportation du modèle de données 
module.exports = mongoose.model('Sauce', sauceShema);