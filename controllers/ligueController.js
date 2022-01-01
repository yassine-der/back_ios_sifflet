const AsyncHandler = require('express-async-handler')
const Ligue = require('../models/ligue')
const Equipe = require('../models/equipe')
const Match = require('../models/match')

const getLigue = AsyncHandler(async(req,res) => {

    const ligues = await Ligue.find({})

    res.json(ligues)
})

const getligueId = AsyncHandler(async(req,res) => {
     const ligue =await Ligue.findById(req.params.id).populate('equipes_ids').select('-_id').select('-user').select('-discription').select('-nom').select('-image').select('-createdAt').select('-updatedAt').select('-matchs_ids')
    if(ligue){
        res.json(ligue)
    }else{
        res.status(404)
        throw new Error('Ligue not found')
    }
})
/*
const addEquipeToLique= AsyncHandler(async(req,res)=>{
    const ligue = await Ligue.findById(req.params.id)

    if(ligue){
        ligue.nom = ligue.nom,
        ligue.discription = ligue.discription
        //ligue.liguecapacite = ligue.liguecapacite,
        if(ligue.equipes_ids.includes(req.body.equipes_ids)){
            // stade.ligues_id = req.body.ligues_id
            console.log("existe deja")
            res.status(404)
            throw new Error('impossible ligue existe deja  ')

           // res.status(404).json('existe deja')
         }else if(ligue.ligues_id.length == 0 ){
            ligue.ligues_id = req.body.equipes_ids
            //const updatestade = await stade.save()

            
        }else{
            ligue.equipes_ids.push(req.body.equipes_ids)
            //const updatestade = await stade.save()

        }
      

        const updateligue = await ligue.save()

        res.status(201).json({ updateligue })
       

        
    } else{
        res.status(404)
        throw new Error('ligue not found')
    }
})
*/
const addLigue = AsyncHandler(async(req,res)=>{
    const{nom,discription, /*liguecapacite,*/equipes_ids,matchs_ids} = req.body

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
        equipes_ids,
    }) 
    ligue.nbE = ligue.equipes_ids.length      

    const createLigue = await ligue.save()
    res.status(201).json({createLigue})
})
// const deleteLigue = AsyncHandler(async(req,res)=>{
//     const ligue = await Ligue.findById(req.params.id)
//     if(ligue){
//         await ligue.remove()
//         res.json({message:'ligue removed'})

//     }else{
//         res.status(404)
//         throw new Error('ligue not found')
//     }

// })
const deleteLigue = AsyncHandler(async(req,res)=>{
    const ligue = await Ligue.findById(req.params.id)
    
    if(ligue){
        for (let i = 0; i < ligue.equipes_ids.length; i++) {
            const equipeA = await Equipe.findById(ligue.equipes_ids[i])
            console.log(ligue.equipes_ids[i])
            if(equipeA){
                equipeA.point = 0
                equipeA.win = 0
                equipeA.null = 0
                equipeA.lose = 0
                equipeA.appar = false
                
                
                const equipea = await equipeA.save()
        
            }else{
                res.status(404)
                throw new Error('equipe not found')
            }
        
        }
        await ligue.remove()
        res.status(200).json({message:'ligue removed'})
        return

    }else{
        res.status(404)
        throw new Error('ligue not found')
    }
//addLigue1
})

const getMyligue = AsyncHandler(async(req,res)=>{
    const my  =await Ligue.find({user:req.user._id})
    res.json(my)
})
// const addEquipeToLigue= AsyncHandler(async(req,res)=>{
//     const ligue = await Ligue.findById(req.params.id)

//     if(ligue){
//         ligue.nom = ligue.nom,
//         ligue.discription = ligue.discription
//         if(ligue.equipes_ids.includes(req.body.equipes_ids)){
//             // stade.ligues_id = req.body.ligues_id
//             console.log("existe deja")
//             res.status(404)
//             throw new Error('impossible equipe existe deja  ')

//            // res.status(404).json('existe deja')
//          }else if(ligue.equipes_ids.length == 0 ){
//             ligue.equipes_ids = req.body.equipes_ids
//         }else{
//             ligue.equipes_ids.push(req.body.equipes_ids)
//         }
//         ligue.matchs_ids = ligue.matchs_ids;
        
//         const updatelique = await ligue.save()


//         res.status(201).json(updatelique)
       

        
//     } else{
//         res.status(404)
//         throw new Error('ligue not found')
//     }
// })
const addEquipeToLigue= AsyncHandler(async(req,res)=>{
    const ligue = await Ligue.findById(req.params.id)

    if(ligue && ligue.equipes_ids.length < 10){
        ligue.nom = ligue.nom,
        ligue.discription = ligue.discription
        if(ligue.equipes_ids.includes(req.body.equipes_ids)){
            // stade.ligues_id = req.body.ligues_id
            console.log("existe deja")
            res.status(404)
            throw new Error('impossible equipe existe deja  ')

           // res.status(404).json('existe deja')
         }else if(ligue.equipes_ids.length == 0 ){
            const equipeA = await Equipe.findById(req.body.equipes_ids)
            if(equipeA && equipeA.appar != true){
                equipeA.appar = true
                ligue.equipes_ids = req.body.equipes_ids
      

                const equipea = await equipeA.save()
            }else{
                res.status(404)
                throw new Error('equipe not found')
            }

        }else{
            const equipeA = await Equipe.findById(req.body.equipes_ids)
            if(equipeA && equipeA.appar != true){
                equipeA.appar = true
                ligue.equipes_ids.push(req.body.equipes_ids)
                const equipea = await equipeA.save()
            }else{
                res.status(404)
                throw new Error('equipe not found')
            }
        }
        ligue.nbE = ligue.equipes_ids.length 

        const updatelique = await ligue.save()


        res.status(201).json(updatelique)
       

        
    } else{
        res.status(404)
        throw new Error('ligue not found')
    }
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
const creationDesMatch =AsyncHandler(async(req,res)=>{
    const ligue = await Ligue.findById(req.params.id)
    await ligue.equipe_A_id.remove()
    await ligue.equipe_B_id.remove()
    if(ligue.equipes_ids.length == 10){         
    //for(var i = 0; i < 10; i++){
       // for(var j = 0;j< 45;j++){
            do{
        var a = getRandomInt(0,10)
        var b = getRandomInt(0,10) 
        if(a != b){
            if(ligue.equipe_A_id.length == 0 && ligue.equipe_B_id.length == 0 ){
                ligue.equipe_A_id = ligue.equipes_ids[a]
                ligue.equipe_B_id = ligue.equipes_ids[b]
            }else{
                ligue.equipe_A_id.push(ligue.equipes_ids[a])
                ligue.equipe_B_id.push(ligue.equipes_ids[b])

            }
            }
        }while(ligue.equipe_A_id.length < 45 && ligue.equipe_A_id.length < 45)
        
        const updateLigue = await ligue.save()


   // }
    res.status(201).json({updateLigue});
    return

        
//}
}else{
    res.status(404)
    throw new Error('Le nombre des equipe et inferieur a 10')
}})
const classement = (async(req,res)=>{
    const equipeA = await Equipe.findById(req.body.idA)
    const equipeB = await Equipe.findById(req.body.idB)


    if(equipeA){
        equipeA.point = (equipeA.win*3) +(equipeA.null)
        equipeB.point = (equipeB.win*3) +(equipeB.null)
        const equipea = await equipeA.save()
        const equipeb = await equipeB.save()

        res.status(201).json({equipeb});
        return

    }else{
        res.status(404)
        throw new Error('equipe not found')
    }

})

const getMatchesA = (async(req,res) => {
    const match =await Ligue.findById(req.params.id).populate('equipe_A_id').select('-equipe_B_id').select('-_id').select('-user').select('-discription').select('-nom').select('-image').select('-createdAt').select('-updatedAt').select('-equipes_ids').select("-__v")

    //const match1 =await Match.find({ligue:req.params.id}).populate('equipe_B_id')
    if(match){
        res.json(match )
    }else{
        res.status(404)
        throw new Error('match not found')
    }
})
const getMatchesB = (async(req,res) => {
    const match =await Ligue.findById(req.params.id).populate('equipe_B_id').select('-equipe_A_id').select('-_id').select('-user').select('-discription').select('-nom').select('-image').select('-createdAt').select('-updatedAt').select('-equipes_ids')

    //const match1 =await Match.find({ligue:req.params.id}).populate('equipe_B_id')
    if(match){
        res.json(match)
    }else{
        res.status(404)
        throw new Error('match not found')
    }
})


const triClassement = AsyncHandler(async(req,res)=>{
    const ligue = await Ligue.findById(req.params.id).populate('equipes_ids').select('-equipe_B_id').select('-user').select('-discription').select('-nom').select('-image').select('-createdAt').select('-updatedAt').select('-equipe_A_id').select("-__v")
    const equipe1 = await Equipe.findById(ligue.equipes_ids[0])
    const equipe2 = await Equipe.findById(ligue.equipes_ids[1])
    const equipe3 = await Equipe.findById(ligue.equipes_ids[2])
    const equipe4 = await Equipe.findById(ligue.equipes_ids[3])
    const equipe5 = await Equipe.findById(ligue.equipes_ids[4])
    const equipe6 = await Equipe.findById(ligue.equipes_ids[5])
    const equipe7 = await Equipe.findById(ligue.equipes_ids[6])
    const equipe8 = await Equipe.findById(ligue.equipes_ids[7])
    const equipe9 = await Equipe.findById(ligue.equipes_ids[8])
    const equipe10 = await Equipe.findById(ligue.equipes_ids[9])

    if(ligue && equipe1 && equipe2 && equipe3 && equipe4 && equipe5 && equipe6 && equipe7 && equipe8 && equipe9 && equipe10 ){
        await ligue.equipes_ids.remove()

        var nums=[equipe1,equipe2,equipe3,equipe4,equipe5,equipe6,equipe7,equipe8,equipe9,equipe10]
            
            for (let i = 1; i < nums.length; i++) {
              let j = i - 1
              let tmp = nums[i]
              while (j >= 0 && nums[j].point < tmp.point && ligue.equipes_ids.length ==10  ) {
                nums[j + 1] = nums[j]
                j--
              }
              nums[j+1] = tmp
            //  if(ligue.equipes_ids.length == 0 ){
            //     ligue.equipes_ids = equipe+i
            // }else{
            //     ligue.equipes_ids.push(equipe+i)
            // }
        }
            res.json(nums)

            return 
          
          

    
    }else{
        res.status(404)
        throw new Error('ligue not found')

    }

})  

 







module.exports= {getLigue, getligueId,addLigue,deleteLigue,creationDesMatch,addEquipeToLigue,getMyligue,getMatchesB,getMatchesA,classement,triClassement }