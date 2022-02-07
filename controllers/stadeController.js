const AsyncHandler = require('express-async-handler')
const Ligue = require('../models/ligue')
const Stade = require('../models/stade')

const getStade = AsyncHandler(async(req,res) => {

    const stads = await Stade.find({})

    res.json(stads)
})
/*

const getStadeId = AsyncHandler(async(req,res) => {
     const stade =await Stade.findById(req.params.id).populate('user','nom','email')
    if(stade){
        res.json(stade)
    }else{
        res.status(404)
        throw new Error('Stade not found')
    }
})
*/
const addStade = AsyncHandler(async(req,res)=>{
    const{nom,lat,lon,discription/*,payementMethods,taxPrice*/,num} = req.body

    const lonExist = await Stade.findOne({lon}) 
    const latExist = await Stade.findOne({lat}) 

    
    if(lonExist && latExist ){
        res.status(400)
        throw new Error('stade Aleardy exists')
    }else{
        const stade = await Stade.create({
            image: req.file.path,
            nom,
            lat,
            lon,
            user:req.user._id,
            discription,
            num,
            isPaid:true,
            //ligues_id:[],
            //matches_ids:[]
            //payementMethods,
            //taxPrice
        }) 
        const createdStade = await stade.save()
        res.status(201).json({createdStade})
    }
    
})
const check = (async(req,res)=>{
    const{nom,lat,lon,discription/*,payementMethods,taxPrice*/,num} = req.body

    const lonExist = await Stade.findOne({lon}) 
    const latExist = await Stade.findOne({lat}) 

    
    if(lonExist && latExist ){
        console.log('laaaaaaaaa')
        res.status(304).json('stade existe')
        return
        }else{
        res.json('bien')
        return
    }
    
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

const getStadeId = AsyncHandler(async(req,res) => {
    const stade =await Stade.findById(req.params.id).populate('ligues_id').select('-_id').select('-user').select('-lat').select('-lon').select('-discription').select('-nom').select('-image').select('-createdAt').select('-updatedAt').select('-taxPrice')
   if(stade){
       res.json(stade)
   }else{
       res.status(404)
       throw new Error('Stade not found')
   }
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
Array.prototype.insert = function (  item ) {
    this.splice(  item );
};
/*
const addLigueToStade= AsyncHandler(async(req,res)=>{
    const stade = await Stade.findById(req.params.id)

    if(stade){
        stade.nom = stade.nom,
        stade.discription = stade.discription
        if(stade.ligues_id.includes(req.body.ligues_id)){
            // stade.ligues_id = req.body.ligues_id
            console.log("existe deja")
            res.status(404)
            throw new Error('impossible ligue existe deja  ')

           // res.status(404).json('existe deja')
         }else if(stade.ligues_id.length == 0 ){
            stade.ligues_id = req.body.ligues_id
            //const updatestade = await stade.save()

            
        }else{
            stade.ligues_id.push(req.body.ligues_id)
            //const updatestade = await stade.save()

        }
        
        const updatestade = await stade.save()


        res.status(201).json({ updatestade })
       

        
    } else{
        res.status(404)
        throw new Error('stade not found')
    }
})
*/
/*
const addLigueToStade= AsyncHandler(async(req,res)=>{
    const stad e = await Stade.findById(req.params.id)
    console.log(req.params)
    console.log(req.body)
    if(stade){
        stade.nom = stade.nom,
        stade.discription = stade.discription,
        stade.ligues_id.push(req.body.ligues_id)
        //stade.ligues_id.splice(stade.ligues_id.lenght,0,req.body.ligues_id)

        const updatestade = await stade.save()

        res.status(200).json({ updatestade })
       

        
    } else{
        res.status(404)
        throw new Error('stade not found')
    }
})
*/
const addLigueToStade= AsyncHandler(async(req,res)=>{
    const stade = await Stade.findById(req.params.id)

    if(stade){
        stade.nom = stade.nom,
        stade.discription = stade.discription,
        stade.num = stade.num
        if(stade.ligues_id.includes(req.body.ligues_id)){
            // stade.ligues_id = req.body.ligues_id
            console.log("existe deja")
            res.status(404)
            throw new Error('impossible ligue existe deja  ')

           // res.status(404).json('existe deja')
         }else if(stade.ligues_id.length == 0 ){
            stade.ligues_id = req.body.ligues_id
        }else{
            stade.ligues_id.push(req.body.ligues_id)
        }
        
        const updatestade = await stade.save()


        res.status(201).json( updatestade )
       

        
    } else{
        res.status(404)
        throw new Error('stade not found')
    }
})
module.exports= {getStade, getStadeId,addStade,updateStadeToPaid,getMystade,deleteStade,addLigueToStade,check}