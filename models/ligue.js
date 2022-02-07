const mongoose= require('mongoose')
const equipe = require('./equipe')

const ligueSchema = new mongoose.Schema({
    ligue: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Ligue'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
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
    
    equipes_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Equipe'}],
    equipe_A_id: [{
        type: mongoose.Schema.Types.ObjectId,
            ref:'Equipe'}],
    equipe_B_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Equipe'}],


    matchs_ids: [{type: mongoose.Schema.Types.ObjectId,
        ref:'Match'}],
        nbE:{type:Number}

},

{
  timestamps :true
})

const Ligue = mongoose.model('Ligue',ligueSchema)
module.exports = Ligue