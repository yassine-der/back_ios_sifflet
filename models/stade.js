const mongoose= require('mongoose')
const stadeSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    /*photo: {
        type:String,
        required:true
    },*/
    nom: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    discription: {
        type:String,
        //required:true
    },
    ligues_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Ligue'
      }],
    payementMethods:{
        type:String,
        //required: true
    },
    payementResult:{
        id: {type:String},
        status:{type:String},
        update_time:{type:String},
        email_address:{type:String}

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