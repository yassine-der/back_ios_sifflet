const express = require('express')
const router = express.Router() 

const {getEquipe, getEquipeId,addEquipe,deleteEquipe,addJoueurToEquipe} = require('../controllers/equipeController')
const {protect,ProprietaireDeStade} = require('../middlware/authmiddlware')

/** 
* @swagger

* / :
*   description: get all equipe
*   get:
*   responses:
*     '200':
*        description: success
*     '500' :
*        description: error 
*/
router.route('/').get(protect,getEquipe).post(protect,ProprietaireDeStade,addEquipe)


/** 
* @swagger

* /:id :
*   description: get equipe by id
*   get:
*   responses:
*     '200':
*        description: success
*     '500' :
*        description: error 
*/
router.route('/:id').get(getEquipeId,protect).put(protect,addJoueurToEquipe)

module.exports = router             

