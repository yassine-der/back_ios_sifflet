const AsyncHandler = require('express-async-handler')
const Ligue = require('../models/ligue')
const Stade = require('../models/stade')
const mongoose= require('mongoose')

const { getLigue,getligueId,addLigue, addEquipeToLique,creationDesMatch } = require('../controllers/ligueController')


const getStade = AsyncHandler(async(req,res) => {

    const stads = await Stade.find({})

    res.json(stads)
})

const getStadeId = AsyncHandler(async(req,res) => {
     const stade =await Stade.findById(req.params.id).populate('ligues_id')
    if(stade){
        res.json(stade)
    }else{
        res.status(404)
        throw new Error('Stade not found')
    }
})
const addStade = AsyncHandler(async(req,res)=>{
    const{nom,lat,lon,discription/*,payementMethods,taxPrice*/} = req.body

    const lonExist = await Stade.findOne({lon}) 
    const latExist = await Stade.findOne({lat}) 

    
    if(lonExist && latExist ){
        res.status(400)
        throw new Error('stade Aleardy exists')
    }
    const stade = await Stade.create({
        image: req.file.path,
        nom,
        lat,
        lon,
        user:req.user._id,
        discription,
        //payementMethods,
        //taxPrice
    }) 
    const createdStade = await stade.save()
    res.status(201).json({nom:createdStade.nom,
        //user:req.user._id,
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

        res.status(200).json(updatedStade)
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

const getligueOfStade =  AsyncHandler(async(req,res)=>{
    const stade  = await Stade.findById(req.params.id)
    //stade.ligues_id.forEach(getligueId)
    if(stade){
       // for (const lid in stade.ligues_id) {
            for (var lid in stade.ligues_id) {
                
                //var li = mongoose.Types.ObjectId(lid)
                //console.log(li)

                const ligue =await Ligue.findById(lid)
            if(ligue){

                console.log('wlh chay')
                res.json(ligue)
            }else{
                res.status(404)
                throw new Error('ligue not found')
            }
        }
        
    }else{
        res.status(404)
        throw new Error('stade not found')
    }
    //res.status(404).json("Not found");
    //return

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
        stade.address = stade.address
        if(stade.ligues_id.length == 0){
            stade.ligues_id = req.body.ligues_id
        }else{
            stade.ligues_id.push(req.body.ligues_id)
        }

        const updatestade = await stade.save()


        res.status(201).json({ updatestade })
       

        
    } else{
        res.status(404)
        throw new Error('stade not found')
    }
})

module.exports= {getStade, getStadeId,addStade,updateStadeToPaid,getMystade,deleteStade,addLigueToStade,getligueOfStade}