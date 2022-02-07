const mongoose= require('mongoose')
const joueur = require('./joueur')

const equipeSchema = new mongoose.Schema({
   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        type:String,
        required:true

    },
    nom: {
        type:String,
        required:true
    },
    discription: {
        type:String,
        required:true
    },
    
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
    score:{type:Number},
    nbJ:{type:Number},
    appar:{type:Boolean}
    
    
},
{
  timestamps :true
})



const Equipe = mongoose.model('Equipe',equipeSchema)
module.exports = Equipe