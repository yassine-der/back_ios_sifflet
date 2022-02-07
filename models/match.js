const mongoose= require('mongoose')
const equipe = require('./equipe')

const matchSchema = new mongoose.Schema({
    /*id: {
        type: Number,
        required : true
    }*/
    /*ligue: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ligue'
    },*/
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    ddd: {
        type:Date,
        
    },
    ddf: {
        type:Date,
        
    },
    
    equipe_A_id: {type: mongoose.Schema.Types.ObjectId,
        ref:'Equipe'
    },
    equipe_B_id: {type: mongoose.Schema.Types.ObjectId,
        ref:'Equipe'
    },
    
},
{
  timestamps :true
})
const Match = mongoose.model('Match',matchSchema)
module.exports = Match