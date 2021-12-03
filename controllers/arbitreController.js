const AsyncHandler = require('express-async-handler')
const Arbitre = require('../models/arbitre')

const getArbitre = AsyncHandler(async(req,res) => {

    const arbitres = await Arbitre.find({})

    res.json(arbitres)
})

const getArbitreId = AsyncHandler(async(req,res) => {
     const arbitre =await Arbitre.findById(req.params.id)
    if(equipe){
        res.json(arbitre)
    }else{
        res.status(404)
        throw new Error('arbitre not found')
    }
})
const addArbitre = AsyncHandler(async(req,res)=>{
    const{nom,age, num,discription} = req.body

    const arbitre = new Arbitre({
        nom,
        user:req.user._id,
        age,
        num,
        discription,
        
    }) 
    const createArbitre = await arbitre.save()
    res.status(201).json({createArbitre})
})

const deleteArbitre = AsyncHandler(async(req,res)=>{
    const arbitre = await Arbitre.findById(req.params.id)
    if(arbitre){
        await equipe.remove()
        res.json({message:'arbitre removed'})

    }else{
        res.status(404)
        throw new Error('arbitre not found')
    }

})

module.exports= {getArbitre, getArbitreId,addArbitre,deleteArbitre}