const express = require('express')
const router = express.Router() 

const { getMatch,getMatchId, addMatch,donnerDesPoint ,updateScore} = require('../controllers/matchController')
const { protect, ProprietaireDeStade } = require('../middlware/authmiddlware')

/**
 * @swagger
 * components:
 *   schemas:
 *     match:
 *       type: object
 *       properties:
 *         ddd:
 *           type: Date
 *           description: The capacity of the equipe
 *         ddf:
 *           type: Date
 *           description: The number of points
 */

 /**
  * @swagger
  * tags:
  *   name: matchs
  *   description: The matchs managing API
  */




//all
/**
 * @swagger
 * /matchs:
 *   get:
 *     summary: Returns the list of all the matchs
 *     tags: [matchs]
 *     responses:
 *       200:
 *         description: The list of the matchs
 */
/**
 * @swagger
 * /matchs:
 *   post:
 *     summary: add match
 *     tags: [matchs]
 *     responses:
 *       200:
 *         description: match added
 */
router.route('/').get(protect,getMatch).post(protect,addMatch)
//one
/**
 * @swagger
 * /matchs:
 *   put:
 *     summary: add points
 *     tags: [matchs]
 *     responses:
 *       200:
 *         description: points added
 */
router.route('/up').put(protect,donnerDesPoint)

/**
 * @swagger
 * /matchs/{id}:
 *   get:
 *     summary: Get the match by id
 *     tags: [matchs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The match id
 *     responses:
 *       200:
 *         description: The match by id
 *       404:
 *         description: The match was not found
 */
/**
 * @swagger
 * /matchs/{id}:
 *   put:
 *     summary: update score
 *     tags: [matchs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: score update
 *     responses:
 *       200:
 *         description: score updated
 *       404:
 *         description: error
 */
router.route('/:id').get(protect,getMatchId).put(protect,updateScore)


module.exports = router
             
