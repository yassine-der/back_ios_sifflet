const express = require('express')
const router = express.Router() 

const { getJoueur,getJoueuryId,addJoueur, getMyJoueur} = require('../controllers/joueurController')
const {protect,ProprietaireDeStade} = require('../middlware/authmiddlware')

//all
router.route('/').get(getJoueur).post(protect,addJoueur)
router.route('/my').get(protect,getMyJoueur)

//one
router.route('/:id').get(getJoueuryId,protect)

module.exports = router             