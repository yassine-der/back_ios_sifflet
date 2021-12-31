const AsyncHandler = require('express-async-handler')
const Equipe = require('../models/equipe')
const mongoose = require('mongoose')

const getEquipe = AsyncHandler(async(req,res) => {

    const equipes = await Equipe.find({})

    res.json(equipes)
})

const getEquipeId = AsyncHandler(async(req,res) => {
     const equipe =await Equipe.findById(req.params.id).populate('joueurs_id').select('-_id').select('-user').select('-discription').select('-nom').select('-image').select('-createdAt').select('-updatedAt').select('-point').select('-win').select('-lose').select('-null')
    if(equipe){
        res.json(equipe)
    }else{
        res.status(404)
        throw new Error('Equipe not found')
    }
})
/*
const addEquipe = AsyncHandler(async(req,res)=>{
    const{nom,discription,joueurs_id} = req.body

    const ligueExist = await Equipe.findOne({nom}) 

    if(ligueExist){
        res.status(400)
        throw new Error('Ligue Aleardy exists')
    }
    const equipe = await Equipe.create({
        image: req.file.path,
        nom,
        user:req.user._id,
        discription,
        joueurs_id,
              
    }) 
    const createEquipe = await equipe.save()
    res.status(201).json({createEquipe})
})*/
const addEquipe = AsyncHandler(async(req,res)=>{
    const{nom,discription, /*equipecapacite*/} = req.body

    const ligueExist = await Equipe.findOne({nom}) 

    if(ligueExist){
        res.status(400)
        throw new Error('Ligue Aleardy exists')
    }


    const equipe = new Equipe ({
        nom,
        image:req.file.path,
        user:req.user._id,
        discription,
        point:0,
        win: 0,
        lose: 0, 
        null: 0 ,       
    }) 
    const createEquipe = await equipe.save()
    res.status(201).json({createEquipe})
})     


const addJoueurToEquipe = AsyncHandler(async(req,res)=>{
    const equipe = await Equipe.findById(req.params.id)

    if(equipe){
        equipe.nom = equipe.nom,
        equipe.discription = equipe.discription,
        //equipe.equipecapacite = equipe.equipecapacite,
        //equipe.joueurs_id.push(req.body.joueurs_id)
        equipe.win = equipe.win,
        equipe.lose = equipe.lose,
        equipe.null = equipe.null

        if(equipe.joueurs_id.includes(req.body.joueurs_id)){
            // stade.ligues_id = req.body.ligues_id
            console.log("existe deja")
            res.status(404)
            throw new Error('impossible joueur existe deja  ')

           // res.status(404).json('existe deja')
         }else if(equipe.joueurs_id.length == 0 ){
            equipe.joueurs_id = req.body.joueurs_id
        }else{
            equipe.joueurs_id.push(req.body.joueurs_id)
        }
        const updateequipe = await equipe.save()

        res.status(201).json({ updateequipe })
       

        
    } else{
        res.status(404)
        throw new Error('equipe not found')
    }
})

const deleteEquipe = AsyncHandler(async(req,res)=>{
    const equipe = await Equipe.findById(req.params.id)
    if(equipe){
        await equipe.remove()
        res.json({message:'equipe removed'})

    }else{
        res.status(404)
        throw new Error('equipe not found')
    }

})
const getMyequipe = AsyncHandler(async(req,res)=>{
    const my  = await Equipe.find({user:req.user._id})
    res.json(my)
})
module.exports= {getEquipe, getEquipeId,addEquipe,deleteEquipe,addJoueurToEquipe,getMyequipe}