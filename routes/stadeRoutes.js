const express = require('express')
const router = express.Router() 
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
      destination(req,file, cb){
          cb(null,'uploads/')
      },
      filename(req,file,cb){
          cb(null,`${file.fildname}-${Date.now()}${path.extname(file.originalname)}`)
      }
  })
  const fileFilter = (req,file,cb)=>{
        if(file.mimetype==='image/jpeg' || file.mimetype ===  'image/jpg'){
              cb(null,true);
        }else{
              cb(null,false);
        }
  }
  const upload = multer({storage: storage,fileFilter: fileFilter
      })

const { getStade,getStadeId,addStade,updateStadeToPaid,getMystade,addLigueToStade,check,deleteStade} = require('../controllers/stadeController')
const {protect,ProprietaireDeStade } = require('../middlware/authmiddlware')

/**
 * @swagger
 * components:
 *   schemas:
 *     stade:
 *       type: object
 *       required:
 *         - image
 *         - nom
 *         - lat
 *         - lon
 *         - description        
 *       properties:
 *         image:
 *           type: string
 *           description: The image of the stade
 *         nom:
 *           type: string
 *           description: The name of the stade
 *         description:
 *           type: String
 *           description: The description of the stade
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


//all

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
 *     summary: add stade
 *     tags: [stades]
 *     responses:
 *       200:
 *         description: stade added 
 */
router.route('/').get(protect,getStade).post(protect,upload.single('image'),addStade)
router.route('/my').get(protect,getMystade)
//one
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
/**
 * @swagger
 * /stades/{id}:
 *   put:
 *     summary: add ligue to stade
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
 *         description: stade added to ligue
 *       404:
 *         description: error
 */
router.route('/:id').get(protect,getStadeId).put(protect,addLigueToStade)
router.route('/pay/paypay').get(protect,check)

/**
 * @swagger
 * /stades/{id}:
 *   delete:
 *     summary: delete stade
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
 *         description: stade deleted
 *       404:
 *         description: error
 */
router.route('/deleteStade/:id').delete(protect,deleteStade)


  
module.exports = router             

