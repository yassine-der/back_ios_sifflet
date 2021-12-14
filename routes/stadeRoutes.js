const express = require('express')
const router = express.Router() 

const { getStade,getStadeId,addStade,updateStadeToPaid,getMystade} = require('../controllers/stadeController')
const {protect,ProprietaireDeStade } = require('../middlware/authmiddlware')


/** 
* @swagger

* / :
*   description: get all stade
*   get:
*   responses:
*     '200':
*        description: success
*     '500' :
*        description: error 
*/
router.route('/').get(getStade).post(protect,ProprietaireDeStade,addStade)
router.route('/my').get(protect,ProprietaireDeStade,getMystade)


/** 
* @swagger

* /:id :
*   description: get one stade
*   get:
*   responses:
*     '200':
*        description: success
*     '500' :
*        description: error 
*/
router.route('/:id').get(protect,getStadeId)
router.route('/:id/pay').put(protect,updateStadeToPaid)

  
module.exports = router             

