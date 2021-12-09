const AsyncHandler = require('express-async-handler')
const Joueur = require('../models/joueur')

const getJoueur = AsyncHandler(async(req,res) => {

    const joueurs = await Joueur.find({})

    res.json(joueurs)
})

const getJoueuryId = AsyncHandler(async(req,res) => {
     const joueur =await Joueur.findById(req.params.id)
    if(joueur){
        res.json(joueur)
    }else{
        res.status(404)
        throw new Error('Joueur not found')
    }
})

const addJoueur = AsyncHandler(async(req,res)=>{
    const{nom,age, taille,longueur,num,discription} = req.body

    const joueurExist = await Joueur.findOne({nom}) 

    if(joueurExist){
        res.status(400)
        throw new Error('Joueur Aleardy exists')
    }


    const joueur = await Joueur.create({
        nom,
        user:req.user._id,
        age,
        taille,
        longueur,
        num,
        discription,
    }) 
    const createJoueur = await joueur.save()
    res.status(201).json({nom:createJoueur.nom,
        user:req.user._id,
        age:createJoueur.age,
        taille:createJoueur.taille,
        longueur:createJoueur.longueur,
        num:createJoueur.num,
        discription:createJoueur.discription})
})
const deleteJoueur = AsyncHandler(async(req,res)=>{
    const joueur = await Joueur.findById(req.params.id)
    if(joueur){
        await ligue.remove()
        res.json({message:'joueur removed'})

    }else{
        res.status(404)
        throw new Error('joueur not found')
    }

})
const getMyJoueur = AsyncHandler(async(req,res)=>{
    const my  =await Joueur.find({user:req.user._id})
    res.json(my)
})


module.exports= {getJoueur, getJoueuryId,addJoueur,deleteJoueur,getMyJoueur}