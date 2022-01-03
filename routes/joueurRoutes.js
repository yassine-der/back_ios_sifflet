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

const { getJoueur,getJoueuryId,addJoueur, getMyJoueur} = require('../controllers/joueurController')
const {protect,ProprietaireDeStade} = require('../middlware/authmiddlware')



/**
 * @swagger
 * components:
 *   schemas:
 *     joueur:
 *       type: object
 *       required:
 *         - image
 *         - nom
 *         - prenom
 *         - age
 *         - taille
 *         - longeur
 *         - numero
 *       properties:
 *         image:
 *           type: string
 *           description: The picture of the player
 *         nom:
 *           type: string
 *           description: The last name of the player
 *         prenom:
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
 *   post:
 *     summary: upload the list of all the players
 *     tags: [joueurs]
 *     responses:
 *       200:
 *         description: The list of the players
 */
router.route('/').post(protect,upload.single('image'),addJoueur)
router.route('/my').get(protect,getMyJoueur)


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
router.route('/').get(protect,getJoueur)
router.route('/:id').get(protect,getJoueuryId)

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