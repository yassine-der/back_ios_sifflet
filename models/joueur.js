const mongoose = require('mongoose')

const joueurSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    photo: {
        type:String,
        //required: true,
       
    },
    nom: {
        type:String,
        required:true
    },
    /*prenom: {
        type:String,
        required:true
    },*/
    age: {
        type: String,
        required:true
    },
    taille: {
        type: String,
        required:true
    },
    longueur: {
        type: String,
        required:true
    },
    num: {
        type:String,
        required:true
    },
    discription: {
        type:String,
     },  
},{
    timestamps :true
})

const Joueur = mongoose.model('Joueur',joueurSchema)
module.exports = Joueur 