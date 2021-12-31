const express = require('express')
const router = express.Router() 

const { getMatch,getMatchId, addMatch,donnerDesPoint ,updateScore} = require('../controllers/matchController')
const { protect, ProprietaireDeStade } = require('../middlware/authmiddlware')
//all
router.route('/').get(protect,getMatch).post(protect,addMatch)
//one
router.route('/up').put(protect,donnerDesPoint)

router.route('/:id').get(protect,getMatchId).put(protect,updateScore)


module.exports = router
             
