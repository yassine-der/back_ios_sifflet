const mongoose= require('mongoose')
const stadeSchema = new mongoose.Schema({
    
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
    lat:{
     type:String,
    required:true
     },
    lon:{
    type:String,
    required:true
},
    discription: {
        type:String,
        required:true
    },
    ligues_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Ligue'
      }],
      num: {
        type:String,
        //required:true
    },
    payementMethods:{
        type:String,
        //required: true
    },
    taxPrice:{
        type:Number,
        //required: true,
        default:0.0
    },
    isPaid:{
        type: Boolean
    },
    paidAt:{
        type: Date
    }

},
{
  timestamps :true
})

const Stade = mongoose.model('Stade',stadeSchema)
module.exports = Stade