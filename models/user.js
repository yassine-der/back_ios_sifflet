const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
   
    image: {
        type:String,
        //required:true
    },

    nom: {
        type:String,
        required:true
    },
    /*resetLink: {
        type:String,
        default:''
    },*/
    prenom: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    /*roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role"
        }
      ],*/
    motdepasse: {
        type:String,
        required:true
    },

      isProprietaireDestade:{
          type: String,
          required: true,
          //default: false
      },
      verifCode:{type:Number},
      isVerified:{type: Boolean}


      },
      {
        timestamps :true
      })

      userSchema.methods.matchPassword = async function(motdepasseentrer){
            return await bcrypt.compare(motdepasseentrer,this.motdepasse)
      }

      userSchema.pre('save', async function(next){
          if(!this.isModified('motdepasse')){
              next()
          }
          const slat = await bcrypt.genSalt(10)
          this.motdepasse = await bcrypt.hash(this.motdepasse, slat)
      })

const User = mongoose.model('User',userSchema)
module.exports = User