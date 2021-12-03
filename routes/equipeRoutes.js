const express = require('express')
const router = express.Router() 

const {getEquipe, getEquipeId,addEquipe,deleteEquipe,addJoueurToEquipe} = require('../controllers/equipeController')
const {protect,ProprietaireDeStade} = require('../middlware/authmiddlware')

//all
router.route('/').get(protect,getEquipe).post(protect,ProprietaireDeStade,addEquipe)
//one
router.route('/:id').get(getEquipeId,protect).put(protect,addJoueurToEquipe)

module.exports = router             

