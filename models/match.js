const mongoose= require('mongoose')
const equipe = require('./equipe')

const matchSchema = new mongoose.Schema({
    /*id: {
        type: Number,
        required : true
    }*/
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
    equipe: {
        type:String,
    },
    equipes_id: [{type: mongoose.Schema.Types.ObjectId,
        ref:'Equipe'
      }],
    
},
{
  timestamps :true
})
const Match = mongoose.model('Match',matchSchema)
module.exports = Match