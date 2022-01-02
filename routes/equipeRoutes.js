const express = require('express')
const router = express.Router() 

const {getEquipe, getEquipeId,addEquipe,deleteEquipe,addJoueurToEquipe} = require('../controllers/equipeController')
const {protect,ProprietaireDeStade} = require('../middlware/authmiddlware')

/**
 * @swagger
 * components:
 *   schemas:
 *     equipe:
 *       type: object
 *       required:
 *         - id
 *         - photo
 *         - nom
 *         - description
 *         - equipecapacite
 *         - point
 *         - win
 *         - lose
 *         - null
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the equipe
 *         photo:
 *           type: string
 *           description: The picture of the equipe
 *         nom:
 *           type: string
 *           description: The name of the equipe
 *         description:
 *           type: string
 *           description: The description of the equipe
 *         equipecapacite:
 *           type: string
 *           description: The capacity of the equipe
 *         point:
 *           type: Number
 *           description: The number of points
 *         win:
 *           type: Number
 *           description: The number of wins
 *         lose:
 *           type: Number
 *           description: The number of losts
 */

 /**
  * @swagger
  * tags:
  *   name: equipes
  *   description: The equipes managing API
  */

/**
 * @swagger
 * /equipes:
 *   get:
 *     summary: Returns the list of all the equipes
 *     tags: [equipes]
 *     responses:
 *       200:
 *         description: The list of the equipes
 */
router.route('/').get(protect,getEquipe).post(protect,ProprietaireDeStade,addEquipe)

/**
 * @swagger
 * /equipes/{id}:
 *   get:
 *     summary: Get the equipe by id
 *     tags: [equipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The equipe id
 *     responses:
 *       200:
 *         description: The equipe by id
 *       404:
 *         description: The equipe was not found
 */
router.route('/:id').get(getEquipeId,protect).put(protect,addJoueurToEquipe)

module.exports = router             

