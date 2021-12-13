const AsyncHandler = require('express-async-handler')
const User = require('../models/user')
const {generateToken} = require('../utils/genreateToken')
const nodemailer = require('nodemailer')

const authUser = AsyncHandler(async(req,res) => {
    const{email,motdepasse} =req.body

    const user = await User.findOne({email})
    
    if(user && (await user.matchPassword(motdepasse)) ){//&& user.isVerified == true){
        res.json({
            _id : user._id,
            nom: user.nom,
            prenom : user.prenom,
            email: user.email,
            isProprietaireDeStade : user.isProprietaireDeStade,
            token: generateToken(user._id)


        })
    }else{
        res.status(401)
        throw new Error('email ou mot de passe n est pas valide ou compte non valide')

} 
})   
const getuserProfile = AsyncHandler(async(req,res) => {
    const user= await User.findById(req.user._id)

    if(user){
        res.json({
            photo: user.photo,
            _id : user._id,
            nom: user.nom,
            prenom : user.prenom,
            email: user.email,
            isProprietaireDeStade : user.isProprietaireDeStade,
            //token: generateToken(user._id)


        })
    }else{
        res.status(404)
        throw new Error('user not found')
    }
})
const transporter = nodemailer.createTransport({

    service : 'gmail',
    auth:{
      user: 'yassine.derbel1@esprit.tn',
      pass: '203JMT3159'
    },

    tls :{
      rejectUnauthorized : false
    }

  })
const registerUser = AsyncHandler(async(req,res) => {
    const{nom,prenom,email,motdepasse,isProprietaireDestade} =req.body

    const userExist = await User.findOne({email})
    
   if(userExist){
       res.status(400)
       throw new Error('user Aleardy exists')
   }
   
   const user = await User.create({
       image: req.file.path,
       nom,
       prenom,
       email,
       motdepasse,
       isProprietaireDestade,
       verifCode: Math.floor(100000 + Math.random() * 900000),
       isVerified: false,



   })    
   
   if(user){
       res.status(201).json({
           photo:user.phot,
            _id : user._id,
        nom: user.nom,
        prenom : user.prenom,
        email: user.email,
        isProprietaireDeStade : user.isProprietaireDeStade,
        photo: user.photo,

        //token: generateToken(user._id)
    })
    const mailOptions = {
        from: '"Sifflet" <yassine.derbel1@esprit.tn>',
        to: user.email,
        subject: 'Sifflet - verify your email',
        html:  ` <h2> hi ${user.nom}! thanks for registering on our App , this is your verification code</h2>
            <h4> ${user.verifCode } </h4>

           
        `
        //<a href="http://${req.headers.host}/users/verify-email?token=${user.emailToken}">Verify your email</a>
      }

      transporter.sendMail(mailOptions, function(error, info){
        if(error){
          console.log(error)
        }else {
          console.log('Verification mail is sent to your gmail')
        }
      })
   
   }else{
       res.status(400)
       throw  new Error('invalid user data')
   }
}) 
const verifEmail = AsyncHandler(async(req, res)=>{

    try {
     const user = await  User.findById(req.params.id);
      const verifCode = req.body.verifCode
      console.log(req.body.verifCode)
      console.log(user.verifCode)
      
      if(user.verifCode == verifCode){
        user.verifCode = null
        user.isVerified = true
        await user.save()
        .then(data => {
          res.status(201).json(data);
         
      })
      //  res.redirect('/login')
      }else{
        
        res.status(400).send("All input is required");
        

       // res.redirect('/register')
        console.log('email is not verified')
      }
      
    } catch (err) {
      console.log(err)
      
    }
  })

const updateUserProfile = AsyncHandler(async(req,res) => {
    const user= await User.findById(req.user._id)

    if(user){
        user.nom = req.body.nom || user.nom
        user.prenom = req.body.prenom || user.prenom
        user.email = req.body.email || user.email
        if(req.body.motdepasse){
            user.motdepasse = req.body.motdepasse
        }
        
        const updateUser = await user.save()

        res.status(201).json({
            //_id : updateUser._id,
            nom: updateUser.nom,
            prenom : updateUser.prenom,
            email: updateUser.email,
            isProprietaireDeStade : updateUser.isProprietaireDeStade,
            //token: generateToken(updateUser._id)


        })
    }else{
        res.status(404)
        throw new Error('user not found')
    }
})
const getusers = AsyncHandler(async(req,res) => {
    const users= await User.find({})
        
   res.json(users)
})
const deleteUser = AsyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({message:'user removed'})

    }else{
        res.status(404)
        throw new Error('user not found')
    }

})
const getUserById = AsyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select('-motdepasse')

    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('user not found')
    }
})

const updateUser = AsyncHandler(async(req,res) => {
    const user= await User.findById(req.params.id)

    if(user){
        user.nom = req.body.nom || user.nom
        user.prenom = req.body.prenom || user.prenom
        user.email = req.body.email || user.email
        user.isProprietaireDeStade = req.body.isProprietaireDeStade
        if(req.body.motdepasse){
            user.motdepasse = req.body.motdepasse
        }
        
        const updateUser = await user.save()

        res.json({
            _id : updateUser._id,
            nom: updateUser.nom,
            prenom : updateUser.prenom,
            email: updateUser.email,
            isProprietaireDeStade : updateUser.isProprietaireDeStade,


        })
    }else{
        res.status(404)
        throw new Error('user not found')
    }
})
const   googleLogin =  AsyncHandler(async(req,res)=>{
    const user= await User.findOne(req.body.email)
    if(user){
    res.json({
        _id : user._id,
        nom: user.nom,
        prenom : user.prenom,
        email: user.email,
        isProprietaireDeStade : user.isProprietaireDeStade,
        token: generateToken(user._id)

    })
}else{
    
   const user = await User.create({
    photo:"",
    nom:req.body.nom,
    prenom:registerUser.body.prenom,
    email:req.body.email,
    motdepasse:req.body.motdepasse,
    isProprietaireDestade:false,
    token: generateToken(user._id)
   })
} 
})

module.exports ={authUser,
                 getuserProfile,
                 registerUser,
                 updateUserProfile
                 ,getusers,
                 deleteUser,
                 getUserById,
                 updateUser,
                 googleLogin,
                 verifEmail}