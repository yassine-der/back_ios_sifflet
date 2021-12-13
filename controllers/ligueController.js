const AsyncHandler = require('express-async-handler')
const Ligue = require('../models/ligue')
const Equipe = require('../models/equipe')
const Match = require('../models/match')
const stade = require('../models/stade')

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

    if(ligue){
        ligue.nom = ligue.nom,
        ligue.discription = ligue.discription,
        //ligue.liguecapacite = ligue.liguecapacite,
        ligue.equipes_ids.push(req.body.equipes_ids)
      

        const updateligue = await ligue.save()

        res.status(201).json({ updateligue })
       

        
    } else{
        res.status(404)
        throw new Error('ligue not found')
    }
})

const addLigue = AsyncHandler(async(req,res)=>{
    const{nom,discription, /*liguecapacite,*/equipes_id} = req.body

    const ligueExist = await Ligue.findOne({nom}) 

    if(ligueExist){
        res.status(400)
        throw new Error('Ligue Aleardy exists')
    }

    const ligue = new Ligue({
        image: req.file.path,
        nom,
        user:req.user._id,
        discription,
        //liguecapacite,
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
const addEquipeToLigue = AsyncHandler(async(req,res)=>{
    const ligue = await Ligue.findById(req.params.id)

    if(equipe){
        ligue.nom = ligue.nom,
        ligue.discription = ligue.discription,
        //equipe.equipecapacite = equipe.equipecapacite,
        ligue.joueurs_id.push(req.body.equipes_ids)
        ligue.matchs_ids = ligue.matchs_ids
       

        const updateLigue = await ligue.save()

        res.status(201).json({ updateLigue })
       

        
    } else{
        res.status(404)
        throw new Error('ligue not found')
    }
})
/*
const addLigueToStade = AsyncHandler(async(req,res)=>{
    const ligue = await Ligue.findById(req.params.id)

    if(ligue){
        ligue.nom = ligue.nom,
        ligue.discription = ligue.discription,
        //equipe.equipecapacite = equipe.equipecapacite,
        //ligue.joueurs_id.push(req.body.equipes_ids)
        //ligue.matchs_ids = ligue.matchs_ids
        ligue.stade = req.body.stade
        
       

        const updateLigue = await ligue.save()

        res.status(201).json({ updateLigue })
       

        
    } else{
        res.status(404)
        throw new Error('ligue not found')
    }
})
 const findliguebystade=AsyncHandler(async(req,res)=>{
    const my  =await Ligue.find({stade:req.body.stade._id})
    res.json(my)

 })
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
const creationDesMatch =AsyncHandler(async(req,res)=>{
    const ligue = await Ligue.findById(req.params.id)
    if(ligue.equipes_ids.length === 10){
    //for(var i = 0; i < 10; i++){
        for(var j = 0;j< 45;j++){
            //do{
        var a = getRandomInt(0,9)
        var b = getRandomInt(0,9) 
        if(a != b){
            const match = new Match({
                //ligue:ligue._id,    
                user:req.user._id,
                equipe_A_id:ligue.equipes_ids[a],
                equipe_B_id:ligue.equipes_ids[b],
            })

            const createMatch = await match.save()
            ligue.matchs_ids.push(createMatch.id)
            ligue.nom = ligue.nom,
            ligue.discription = ligue.discription,
            ligue.joueurs_id = ligue.joueurs_id
            const updateLigue = await ligue.save()
            console.log(j);
           
            }
        //}while(ligue.matchs_ids.length != 45)
        
        

    }
    res.status(201).json({ligue});
    return

        
//}
}else{
    res.status(404)
    throw new Error('Le nombre des equipe et inferieur a 10')
}})

module.exports= {getLigue, getligueId,addLigue,deleteLigue,addEquipeToLique,creationDesMatch}