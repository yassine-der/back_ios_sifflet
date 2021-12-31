const AsyncHandler = require('express-async-handler')
const Match = require('../models/match')
const Equipe = require('../models/equipe')
const Ligue = require('../models/ligue')

const getMatch = AsyncHandler(async(req,res) => {

    const matchs = await Match.find({})

    res.json(matchs)
})

const getMatchId = AsyncHandler(async(req,res) => {
     const match =await Equipe.findById(req.params.id)
    if(match){
        res.json(match)
    }else{
        res.status(404)
        throw new Error('Match not found')
    }
})

const addMatch = AsyncHandler(async(req,res)=>{
    const ligue = await Ligue.findById(req.params.id)

    if(ligue){
        //const liguelength = ligue.equipes_id,
        var min=1; 
        var max=liguecapacite;  
        for (let i = 0; i < 2; i++) {
            var random = Math.floor(Math.random() * (max - min)) + min;
            var equiperandom = ligue.equipes_ids[random]
            const match = new Match({
                equipe_id: equiperandom,
            })

          }

           
    }

}
)
const updateScore = (async(req,res)=>{
    const {score}=req.body
    const matchA = await Equipe.findById(req.params.id)
    //const matchB = await Equipe.findById(req.params.idB)
if(matchA){
    matchA.score = score
    //matchB.score = score
    const udateScoreA = await  matchA.save()
    //const udateScoreB = await  matchB.save()
    res.status(201).json({udateScoreA});
       return
}else{
    res.status(404)
    // throw new Error(' 9ass e 4aw fi wost l match w mane ch fahmin alech lel taw ')
}

})
const donnerDesPoint = AsyncHandler(async(req,res) =>{


    const equipeA = await Equipe.findById(req.body.idA)
    const equipeB = await Equipe.findById(req.body.idB)

 if(equipeA && equipeB){
     if(equipeA.score > equipeB.score){
         //const equipeA = await Equipe.findById(match.equipe_A_id)
         //const equipeB = await Equipe.findById(match.equipe_B_id)
         
         equipeB.lose = equipeB.lose + 1
         equipeA.win = equipeA.win + 1
         equipeA.point = (equipeA.win*3) +(equipeA.null)
         equipeB.point = (equipeB.win*3) +(equipeB.null)
 
         const equipea = await equipeA.save()
         const equipeb = await equipeB.save()
 
         res.status(201).json({equipeb});
         return
        } else if(equipeA.score < equipeB.score) {
         //const equipeA = await Equipe.findById(match.equipe_A_id)
         //const equipeB = await Equipe.findById(match.equipe_B_id)
         equipeB.win += 1
         equipeA.lose+= 1 
         equipeA.point = (equipeA.win*3) +(equipeA.null)
         equipeB.point = (equipeB.win*3) +(equipeB.null)
 
         const equipea = await equipeA.save()
         const equipeb = await equipeB.save()

        
 
         res.status(201).json({equipea});
         return
 
        } else {
         //const equipeA = await Equipe.findById(match.equipe_A_id)
         //const equipeB = await Equipe.findById(match.equipe_B_id)
         equipeA.null += 1
         equipeB.null+= 1 
         equipeA.point = (equipeA.win*3) +(equipeA.null)
         equipeB.point = (equipeB.win*3) +(equipeB.null)
 
 
         const equipea = await equipeA.save()
         const equipeb = await equipeB.save()
         res.status(201).json({equipea});
         return
 
        }
        
 }else{
     res.status(404)
     throw new Error(' 9ass e 4aw fi wost l match w mane ch fahmin alech lel taw ')
 }
    
 })
/*
const donnerDesPoint = AsyncHandler(async(req,res) =>{


   const match = await Match.findById(req.params.id)
if(match){
    if(match.score_A > match.score_B){
        const equipeA = await Equipe.findById(match.equipe_A_id)
        const equipeB = await Equipe.findById(match.equipe_B_id)
        
        equipeB.lose = equipeB.lose + 1
        equipeA.win = equipeA.win + 1
        const equipea = await equipeA.save()
        const equipeb = await equipeB.save()

        res.status(201).json({equipeb});
        return
       } else if(match.score_A = match.score_B) {
        const equipeA = await Equipe.findById(match.equipe_A_id)
        const equipeB = await Equipe.findById(match.equipe_B_id)
        equipeA.null += 1
        equipeB.null+= 1 

        const equipea = await equipeA.save()
        const equipeb = await equipeB.save()

        res.status(201).json({equipeA});
        return

       } else {
        const equipeA = await Equipe.findById(match.equipe_A_id)
        const equipeB = await Equipe.findById(match.equipe_B_id)
        equipeB.win += 1
        equipeA.lose+= 1 
        const equipea = await equipeA.save()
        const equipeb = await equipeB.save()

        res.status(201).json({equipeA});
        return

       }
       
}else{
    res.status(404)
    throw new Error(' 9ass e 4aw fi wost l match w mane ch fahmin alech lel taw ')
}
   
})
*/
module.exports= {getMatch, getMatchId,  addMatch,donnerDesPoint,updateScore}





