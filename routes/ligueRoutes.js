const express = require('express')
const router = express.Router() 

const { getLigue,getligueId,addLigue, addEquipeToLique } = require('../controllers/ligueController')
const {protect,ProprietaireDeStade} = require('../middlware/authmiddlware')

/** 
* @swagger

* / :
*   description: get all ligues
*   get:
*   responses:
*     '200':
*        description: success
*     '500' :
*        description: error 
*/
router.route('/').get(getLigue).post(protect,ProprietaireDeStade,addLigue)

/** 
* @swagger

* /:id :
*   description: get one ligue
*   get:
*   responses:
*     '200':
*        description: success
*     '500' :
*        description: error 
*/
router.route('/:id').get(getligueId).put(protect,ProprietaireDeStade,addEquipeToLique)

module.exports = router             

