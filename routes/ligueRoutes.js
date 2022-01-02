const express = require('express')
const router = express.Router() 

const { getLigue,getligueId,addLigue, addEquipeToLique } = require('../controllers/ligueController')
const {protect,ProprietaireDeStade} = require('../middlware/authmiddlware')

/**
 * @swagger
 * components:
 *   schemas:
 *     equipe:
 *       type: object
 *       required:
 *         - id
 *         - nom
 *         - description
 *         - liguecapacite
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the ligue
 *         photo:
 *           type: string
 *           description: The picture of the ligue
 *         nom:
 *           type: string
 *           description: The name of the ligue
 *         description:
 *           type: string
 *           description: The description of the ligue
 *         liguecapacite:
 *           type: string
 *           description: The capacity of the ligue
 */

 /**
  * @swagger
  * tags:
  *   name: ligues
  *   description: The ligues managing API
  */

/**
 * @swagger
 * /ligues:
 *   get:
 *     summary: Returns the list of all the ligues
 *     tags: [ligues]
 *     responses:
 *       200:
 *         description: The list of the ligues
 */
router.route('/').get(getLigue).post(protect,ProprietaireDeStade,addLigue)

/**
 * @swagger
 * /ligues/{id}:
 *   get:
 *     summary: Get the ligue by id
 *     tags: [ligues]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ligue id
 *     responses:
 *       200:
 *         description: The ligue by id
 *       404:
 *         description: The ligue was not found
 */
router.route('/:id').get(getligueId).put(protect,ProprietaireDeStade,addEquipeToLique)

module.exports = router             

