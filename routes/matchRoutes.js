const express = require('express')
const router = express.Router() 

const { getMatch,getMatchId, addMatch } = require('../controllers/matchController')
const { protect, ProprietaireDeStade } = require('../middlware/authmiddlware')


/**
 * @swagger
 * components:
 *   schemas:
 *     match:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the match
 *         ddd:
 *           type: Date
 *           description: The capacity of the equipe
 *         ddf:
 *           type: Date
 *           description: The number of points
 *         equipe:
 *           type: String
 *           description: The equipe
 *         equipes_id:
 *           type: Number
 *           description: The id of the equipes
 */

 /**
  * @swagger
  * tags:
  *   name: matchs
  *   description: The matchs managing API
  */

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
router.route('/').get(protect,getMatch).post(protect,ProprietaireDeStade,addMatch)


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
router.route('/:id').get(protect,getMatchId)

module.exports = router             

