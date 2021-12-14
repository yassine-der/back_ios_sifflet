const express = require('express')
const router = express.Router() 

const { getJoueur,getJoueuryId,addJoueur, getMyJoueur} = require('../controllers/joueurController')
const {protect,ProprietaireDeStade} = require('../middlware/authmiddlware')

/** 
* @swagger

* / :
*   description: get all joueur 
*   get:
*   responses:
*     '200':
*        description: success
*     '500' :
*        description: error 
*/
router.route('/').get(getJoueur).post(protect,addJoueur)
router.route('/my').get(protect,getMyJoueur)

/** 
* @swagger

* /:id :
*   description: get joueur by id
*   get:
*   responses:
*     '200':
*        description: success
*     '500' :
*        description: error 
*/
router.route('/:id').get(getJoueuryId,protect)

module.exports = router             