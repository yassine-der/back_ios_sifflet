const AsyncHandler = require('express-async-handler')
const Ligue = require('../models/ligue')
const Stade = require('../models/stade')

const getStade = AsyncHandler(async(req,res) => {

    const stads = await Stade.find({})

    res.json(stads)
})

const getStadeId = AsyncHandler(async(req,res) => {
     const stade =await Stade.findById(req.params.id).populate('user','nom','email')
    if(stade){
        res.json(stade)
    }else{
        res.status(404)
        throw new Error('Stade not found')
    }
})
const addStade = AsyncHandler(async(req,res)=>{
    const{nom,address,discription/*,payementMethods,taxPrice*/} = req.body

    const stade = await Stade.create({
        nom,
        user:req.user._id,
        address,
        discription,
        //payementMethods,
        //taxPrice
    }) 
    const createdStade = await stade.save()
    res.status(201).json({nom:createdStade.nom,
        user:req.user._id,
        address:createdStade.address,
        discription:createdStade.discription})
})
const updateStadeToPaid = AsyncHandler(async(req,res)=>{
    const stade = await  Stade.findById(req.body.id)

    if(stade){/*
        stade.isPaid = true
        stade.paidAt = Date.now()
        stade.payementResult= {
            id:req.body.id,
            status: req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address

        }*/
        const updatedStade = await stade.save()

        res.json(updatedStade)
    }
    else{
        res.status(404)
        throw new Error('stade not found')
    }
})
const getMystade = AsyncHandler(async(req,res)=>{
    const my  =await Stade.find({user:req.user._id})
    res.json(my)
})

const deleteStade = AsyncHandler(async(req,res)=>{
    const stade = await Stade.findById(req.params.id)
    if(stade){
        await stade.remove()
        res.json({message:'stade removed'})

    }else{
        res.status(404)
        throw new Error('stade not found')
    }

})
const addLigueToStade= AsyncHandler(async(req,res)=>{
    const stade = await Stade.findById(req.params.id)

    if(stade){
        stade.nom = stade.nom,
        stade.discription = stade.discription,
        stade.address = stade.address,
        stade.ligues_id.push(req.body.ligues_id)

        const updatestade = await stade.save()

        res.status(201).json({ updatestade })
       

        
    } else{
        res.status(404)
        throw new Error('stade not found')
    }
})

module.exports= {getStade, getStadeId,addStade,updateStadeToPaid,getMystade,deleteStade}