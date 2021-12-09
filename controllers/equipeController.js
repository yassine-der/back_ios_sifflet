const AsyncHandler = require('express-async-handler')
const Equipe = require('../models/equipe')
const mongoose = require('mongoose')

const getEquipe = AsyncHandler(async(req,res) => {

    const equipes = await Equipe.find({})

    res.json(equipes)
})

const getEquipeId = AsyncHandler(async(req,res) => {
     const equipe =await Equipe.findById(req.params.id)
    if(equipe){
        res.json(equipe)
    }else{
        res.status(404)
        throw new Error('Equipe not found')
    }
})

const addEquipe = AsyncHandler(async(req,res)=>{
    const{nom,discription, /*equipecapacite*/} = req.body

    const equipe = await Equipe.create({
        image: req.file.path,
        nom,
        user:req.user._id,
        discription,
        //equipecapacite,
        joueurs_id:[],
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
        equipe.joueurs_id.push(req.body.joueurs_id)
        equipe.win = equipe.win,
        equipe.lose = equipe.lose,
        equipe.null = equipe.null

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
module.exports= {getEquipe, getEquipeId,addEquipe,deleteEquipe,addJoueurToEquipe}