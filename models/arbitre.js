const mongoose = require('mongoose')
 
const arbitreSchema = new mongoose.Schema({
   /* id: {
        type: Number,
        required : true
    },*/
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    photo: {
        type:String,
        required:true
    },
    nom: {
        type:String,
        required:true
    },
    /*
    prenom: {
        type:String,
        required:true
    },*/
    age: {
        type: String,
        required:true
    },
    num: {
        type:String,
        required:true
    },
    discription: {
        type:String,
        required:true
    },
},
{
    timestamps :true
})


const Arbitre  = mongoose.model('Arbitre',arbitreSchema)
module.exports = Arbitre