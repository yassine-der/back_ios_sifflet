const express = require('express')
const router = express.Router() 

const { getStade,getStadeId,addStade,updateStadeToPaid,getMystade} = require('../controllers/stadeController')
const {protect,ProprietaireDeStade } = require('../middlware/authmiddlware')
//all
router.route('/').get(getStade).post(protect,ProprietaireDeStade,addStade)
router.route('/my').get(protect,ProprietaireDeStade,getMystade)
//one
router.route('/:id').get(protect,getStadeId)
router.route('/:id/pay').put(protect,updateStadeToPaid)

  
module.exports = router             

