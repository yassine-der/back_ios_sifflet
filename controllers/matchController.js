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

module.exports= {getMatch, getMatchId,  addMatch}