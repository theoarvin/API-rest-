const Sauce = require('../models/Sauce');
// importation du module 'fs' pour accéder aux fichiers du serveur
const fs = require('fs');
// importation du model de la base de données 
const dotenv = require("dotenv");
dotenv.config();

//controller pour afficher toutes les sauces 
exports.getAllSauces = (req, res, next) => {
        Sauce.find()
          .then((sauces) => res.status(200).json(sauces))
          .catch((error) => res.status(404).json({ error }));
 };

// controller pour afficher une sauce 
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id : req.params.id })
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};


// controller pour ajouter une sauce
exports.postSauce = (req,res,next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  
  const sauce = new Sauce ({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
} 


// controller pour modifier une sauce
exports.changeSauce = (req, res, next) => {
  if(req.file){
     Sauce.findOne({_id : req.params.id})
    .then((objet) => {
        // récupération du nom de la photo à supprimer dans la base de données
        const filename = objet.imageUrl.split("/images")[1] ;
        console.log(filename);
        //suppression de l'image dans le dossier images
        fs.unlink(`images/${filename}`, (error) => {
            if(error) throw error;
        })
    })
    .catch(error => res.status(400).json({ error })); 
  }else{
    console.log(false);
  }
  
  // l'objet qui va être mis à jour dans la base de données
  // deux cas possible
  const sauceObject = req.file ? 
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : 
  {
    ...req.body

  }

  // modifications qui seront envoyé dans la base de données
  Sauce.updateOne({ _id : req.params.id }, {...sauceObject , _id : req.params.id})
      .then(() => res.status(200).json({ 
        message: "objet modifié"
      
      }))
      .catch(error => res.status(400).json({ error }));
};


// controller pour supprimer une sauce 
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id : req.params.id})
  .then((objet) => {
      // récupération du nom de la photo à supprimer dans la base de données
      const filename = objet.imageUrl.split("/images")[1];
      //suppression de l'image dans le dossier images
      fs.unlink(`images/${filename}`, () => {
           Sauce.deleteOne({ _id: req.params.id })
           .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
           .catch((error) => res.status(400).json({error}))
      })
  })
  .catch((error) => res.status(500).json({error}))
  
}

exports.likeSauce = (req, res, next) => {
 console.log(req.body.like);
 let like = req.body.like;
 let userId = req.body.userId;

 Sauce.findOne({_id : req.params.id})
 .then((sauce) => {
     switch (like){
       case -1 :
           sauce.dislikes++ 
           sauce.usersDisliked.push(userId);
           console.log(sauce.usersDisliked);
           sauce.save()
             .then(() => res.status(201).json({ message: ' vous avez disliker cette sauce !'}))
             .catch(error => res.status(400).json({ error }));
       break

       case 0 :
            // si l'user a liker , on annule le like
            if(sauce.usersLiked.includes(userId)){
                 let index = sauce.usersLiked.indexOf(userId)
                 sauce.usersLiked.splice(index, 1)
                 sauce.likes-- 
                 sauce.save()
                .then(() => res.status(201).json({ message: ' vous avez annulé votre like !'}))
                .catch(error => res.status(400).json({ error }));
            // si l'user a disliker , on annule le dislike
            }else if (sauce.usersDisliked.includes(userId)){
                 let index = sauce.usersDisliked.indexOf(userId)
                 sauce.usersDisliked.splice(index, 1)
                 sauce.dislikes-- 
                 sauce.save()
                .then(() => res.status(201).json({ message: ' vous avez annulé votre dislike !'}))
                .catch(error => res.status(400).json({ error }));
            }
       break

       case 1 :
            sauce.likes++ 
            sauce.usersLiked.push(userId);
            console.log(sauce.usersLiked);
            sauce.save()
            .then(() => res.status(201).json({ message: ' vous avez liker cette sauce !'}))
            .catch(error => res.status(400).json({ error }));
       break

       default:
        console.log(error);
     }
 })
 .catch((error) => res.status(500).json({error}))
 //
 //
 
}