const express = require('express')
const router = express.Router() 

const { getStade,getStadeId,addStade,updateStadeToPaid,getMystade} = require('../controllers/stadeController')
const {protect,ProprietaireDeStade } = require('../middlware/authmiddlware')

/**
 * @swagger
 * components:
 *   schemas:
 *     stade:
 *       type: object
 *       required:
 *         - nom
 *         - adress
 *       properties:
 *         id:
 *           type: string
 *           description: The id of the match
 *         nom:
 *           type: string
 *           description: The name of the stade
 *         adress:
 *           type: string
 *           description: The adress of the stade
 *         description:
 *           type: String
 *           description: The description of the stade
 *         ligues_id:
 *           type: string
 *           description: The id of the ligues
 *         payementMethods:
 *           type: string
 *           description: The payment methode of the stade
 *         taxPrice:
 *          type: Number
 *          description: The tax price of the stade
 *         isPaid:
 *          type: Boolean
 *          description: The status of the payment of the stade
 *         paidAt:
 *          type: Date
 *          description: The date of the payment of the stade
 */

 /**
  * @swagger
  * tags:
  *   name: stades
  *   description: The stades managing API
  */

/**
 * @swagger
 * /stades:
 *   get:
 *     summary: Returns the list of all the stades
 *     tags: [stades]
 *     responses:
 *       200:
 *         description: The list of the stades
 */

/**
 * @swagger
 * /stades:
 *   post:
 *     summary: Returns the list of all the stades
 *     tags: [stades]
 *     produces:
 *     - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The stades id
 *     responses:
 *       200:
 *         description: The list of the stades
 */
router.route('/').get(getStade).post(protect,ProprietaireDeStade,addStade)
router.route('/my').get(protect,ProprietaireDeStade,getMystade)

/**
 * @swagger
 * /stades/{id}:
 *   get:
 *     summary: Get the stades by id
 *     tags: [stades]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The stades id
 *     responses:
 *       200:
 *         description: The stade by id
 *       404:
 *         description: The stade was not found
 */
router.route('/:id').get(protect,getStadeId)

/**
 * @swagger
 * /stades/{id}:
 *  put:
 *    summary: Update the stade by the id
 *    tags: [stades]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The stade id
 *    responses:
 *      200:
 *        description: The stade was updated
 *      404:
 *        description: The stade was not found
 *      500:
 *        description: Some error happened
 */
router.route('/:id/pay').put(protect,updateStadeToPaid)

  
module.exports = router             

