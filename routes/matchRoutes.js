const express = require('express')
const router = express.Router() 

const { getMatch,getMatchId, addMatch } = require('../controllers/matchController')
const { protect, ProprietaireDeStade } = require('../middlware/authmiddlware')


/** 
* @swagger

* / :
*   description: get all match
*   get:
*   responses:
*     '200':
*        description: success
*     '500' :
*        description: error 
*/
router.route('/').get(protect,getMatch).post(protect,ProprietaireDeStade,addMatch)


/** 
* @swagger

* /:id :
*   description: get one match
*   get:
*   responses:
*     '200':
*        description: success
*     '500' :
*        description: error 
*/
router.route('/:id').get(protect,getMatchId)

module.exports = router             

