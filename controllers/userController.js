const AsyncHandler = require('express-async-handler')
const User = require('../models/user')
const {generateToken} = require('../utils/genreateToken')

const authUser = AsyncHandler(async(req,res) => {
    const{email,motdepasse} =req.body

    const user = await User.findOne({email})
    
    if(user && (await user.matchPassword(motdepasse))){
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
        throw new Error('email ou mot de passe n est pas valide')

} 
})   
const getuserProfile = AsyncHandler(async(req,res) => {
    const user= await User.findById(req.user._id)

    if(user){
        res.json({
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
const registerUser = AsyncHandler(async(req,res) => {
    const{nom,prenom,email,motdepasse,isProprietaireDestade} =req.body

    const userExist = await User.findOne({email})
    
   if(userExist){
       res.status(400)
       throw new Error('user Aleardy exists')
   }

   const user = await User.create({
       nom,
       prenom,
       email,
       motdepasse,
       isProprietaireDestade

   })
   
       //nodemailer 
       let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    let mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'confirmation account',
        text: 'welcome to sifflet'
    } 
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log('error Occurs');
        }else {
            console.log('email sent !');
        }
    });
    
   if(user){
       res.status(201).json({ _id : user._id,
        nom: user.nom,
        prenom : user.prenom,
        email: user.email,
        isProprietaireDeStade : user.isProprietaireDeStade
        //token: generateToken(user._id)
    })
   
   }else{
       res.status(400)
       throw  new Error('invalid user data')
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

        res.json({
            _id : updateUser._id,
            nom: updateUser.nom,
            prenom : updateUser.prenom,
            email: updateUser.email,
            isProprietaireDeStade : updateUser.isProprietaireDeStade,
            token: generateToken(updateUser._id)


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

module.exports ={authUser,
                 getuserProfile,
                 registerUser,
                 updateUserProfile
                 ,getusers,
                 deleteUser,
                 getUserById,
                 updateUser}