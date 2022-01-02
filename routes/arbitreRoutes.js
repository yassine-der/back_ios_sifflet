const express = require('express')
const router = express.Router() 

const { getArbitre,getArbitreId } = require('../controllers/arbitreController')


/**
 * @swagger
 * components:
 *   schemas:
 *     arbitre:
 *       type: object
 *       required:
 *         - id
 *         - photo
 *         - nom
 *         - prenom
 *         - age
 *         - numero
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the arbitre
 *         photo:
 *           type: string
 *           description: The picture of the arbitre
 *         nom:
 *           type: string
 *           description: The name of the arbitre
 *         prenom:
 *           type: string
 *           description: The last name of the arbitre
 *         age:
 *           type: string
 *           description: The age of the arbitre
 *         numero:
 *           type: string
 *           description: The number of the arbitre
 *         description:
 *           type: string
 *           description: The description of the arbitre
 */

 /**
  * @swagger
  * tags:
  *   name: arbitres
  *   description: The arbitre managing API
  */

/**
 * @swagger
 * /arbitres:
 *   get:
 *     summary: Returns the list of all the arbitres
 *     tags: [arbitres]
 *     responses:
 *       200:
 *         description: The list of the arbitres
 */

router.route('/').get(getArbitre)

/**
 * @swagger
 * /arbitres/{id}:
 *   get:
 *     summary: Get the arbitre by id
 *     tags: [arbitres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The arbitre id
 *     responses:
 *       200:
 *         description: The arbitre by id
 *       404:
 *         description: The arbitre was not found
 */
router.route('/:id').get(getArbitreId)

module.exports = router             

