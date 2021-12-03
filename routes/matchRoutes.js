const express = require('express')
const router = express.Router() 

const { getMatch,getMatchId, addMatch } = require('../controllers/matchController')
const { protect, ProprietaireDeStade } = require('../middlware/authmiddlware')
//all
router.route('/').get(protect,getMatch).post(protect,ProprietaireDeStade,addMatch)
//one
router.route('/:id').get(protect,getMatchId)

module.exports = router             

