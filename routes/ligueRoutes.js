const express = require('express')
const router = express.Router() 

const { getLigue,getligueId,addLigue, addEquipeToLique } = require('../controllers/ligueController')
const {protect,ProprietaireDeStade} = require('../middlware/authmiddlware')

//all
router.route('/').get(getLigue).post(protect,ProprietaireDeStade,addLigue)
//one
router.route('/:id').get(getligueId).put(protect,ProprietaireDeStade,addEquipeToLique)

module.exports = router             

