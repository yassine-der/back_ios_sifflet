const express = require('express')
const router = express.Router() 

const { getJoueur,getJoueuryId,addJoueur, getMyJoueur} = require('../controllers/joueurController')
const {protect,ProprietaireDeStade} = require('../middlware/authmiddlware')







/**
 * @swagger
 * components:
 *   schemas:
 *     joueur:
 *       type: object
 *       required:
 *         - id
 *         - photo
 *         - nom
 *         - age
 *         - taille
 *         - longeur
 *         - numero
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the player
 *         photo:
 *           type: string
 *           description: The picture of the player
 *         nom:
 *           type: string
 *           description: The name of the player
 *         age:
 *           type: string
 *           description: The age of the player
 *         taille:
 *           type: string
 *           description: The size of the player
 *         longeur:
 *           type: string
 *           description: The length of the player
 *         numero:
 *           type: string
 *           description: The number of the player
 */

 /**
  * @swagger
  * tags:
  *   name: joueurs
  *   description: The players managing API
  */

/**
 * @swagger
 * /joueurs:
 *   get:
 *     summary: Returns the list of all the players
 *     tags: [joueurs]
 *     responses:
 *       200:
 *         description: The list of the players
 */
 router.route('/').get(getJoueur).post(protect,addJoueur)
 router.route('/my').get(protect,getMyJoueur)
 /**
 * @swagger
 * /joueurs/{id}:
 *   get:
 *     summary: Get the player by id
 *     tags: [joueurs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The player id
 *     responses:
 *       200:
 *         description: The player by id
 *       404:
 *         description: The player was not found
 */
 
router.route('/:id').get(getJoueuryId,protect)

module.exports = router             