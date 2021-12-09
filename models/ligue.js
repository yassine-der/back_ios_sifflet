const mongoose= require('mongoose')
const equipe = require('./equipe')

const ligueSchema = new mongoose.Schema({
    /*id: {
        type: Number,
        required : true
    },*/
    user: {
        type: mongoose.Schema.Types.ObjectId,
        //required: true,
        ref: 'User'
    },
    image: {
        type:String,
        //required:true
    },
    nom: {
        type:String,
        required:true
    },
    
    discription: {
        type:String,
        required:true
    },
    /*liguecapacite:{
        type: Number,
        required:true,
    },*/
    equipes_ids: [{type: mongoose.Schema.Types.ObjectId,
        ref:'Equipe'}],

    matchs_ids: [{type: mongoose.Schema.Types.ObjectId,
        ref:'Match'}],
},
{
  timestamps :true
})

const Ligue = mongoose.model('Ligue',ligueSchema)
module.exports = Ligue