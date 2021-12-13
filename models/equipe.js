const mongoose= require('mongoose')
const joueur = require('./joueur')

const equipeSchema = new mongoose.Schema({
   /* id: {
        type: Number,
        required : true
    },*/
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        type:String,
    },
    nom: {
        type:String,
        required:true
    },
    discription: {
        type:String,
        required:true
    },
    /*equipecapacite: {
        type:String,
        require:true
    },*/
    joueurs_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Joueur'
    }],
    point: {
        type:Number,
        required:true
    },
    win: {
        type:Number,
        required:true
    },
    lose: {
        type:Number,
        required:true
    },
    null: {
        type:Number,
        required:true
    },
    
},
{
  timestamps :true
})



const Equipe = mongoose.model('Equipe',equipeSchema)
module.exports = Equipe