const express = require('express')
const router = express.Router() 

const { getArbitre,getArbitreId } = require('../controllers/arbitreController')

/** 
* @swagger

* / :
*   description: get all arbitre
*   get:
*   responses:
*     '200':
*        description: success
*     '500' :
*        description: error 
*/
router.route('/').get(getArbitre)

/** 
* @swagger

* /:id :
*   description: get arbitre by id
*   get:
*   responses:
*     '200':
*        description: success
*     '500' :
*        description: error 
*/
router.route('/:id').get(getArbitreId)

module.exports = router             

