const AsyncHandler = require('express-async-handler')
const Ligue = require('../models/ligue')
const Equipe = require('../models/equipe')

const getLigue = AsyncHandler(async(req,res) => {

    const ligues = await Ligue.find({})

    res.json(ligues)
})

const getligueId = AsyncHandler(async(req,res) => {
     const ligue =await Ligue.findById(req.params.id)
    if(ligue){
        res.json(ligue)
    }else{
        res.status(404)
        throw new Error('Ligue not found')
    }
})
const addEquipeToLique= AsyncHandler(async(req,res)=>{
    const ligue = await Ligue.findById(req.params.id)

    if(equipe){
        ligue.nom = ligue.nom,
        ligue.discription = ligue.discription,
        ligue.liguecapacite = ligue.liguecapacite,
        ligue.equipes_ids.push(req.body.equipes_ids)
      

        const updateligue = await ligue.save()

        res.status(201).json({ updateligue })
       

        
    } else{
        res.status(404)
        throw new Error('ligue not found')
    }
})

const addLigue = AsyncHandler(async(req,res)=>{
    const{nom,discription, liguecapacite,equipes_id} = req.body

    const ligue = new Ligue({
        nom,
        user:req.user._id,
        discription,
        liguecapacite,
        equipes_id,
        
    }) 
    const createLigue = await ligue.save()
    res.status(201).json({createLigue})
})
const deleteLigue = AsyncHandler(async(req,res)=>{
    const ligue = await Ligue.findById(req.params.id)
    if(ligue){
        await ligue.remove()
        res.json({message:'ligue removed'})

    }else{
        res.status(404)
        throw new Error('ligue not found')
    }

})

module.exports= {getLigue, getligueId,addLigue,deleteLigue,addEquipeToLique}