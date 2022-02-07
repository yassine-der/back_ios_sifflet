const express = require('express')
const router = express.Router() 
const multer = require('multer')
const path = require('path')
const AsyncHandler = require('express-async-handler')

const Equipe = require('../models/equipe')

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

const {getEquipe, getEquipeId,addEquipe,deleteEquipe,addJoueurToEquipe,getMyequipe} = require('../controllers/equipeController')
const {protect,ProprietaireDeStade} = require('../middlware/authmiddlware')




/**
 * @swagger
 * components:
 *   schemas:
 *     equipe:
 *       type: object
 *       required:
 *         - image
 *         - nom
 *         - description
 *         - point
 *         - win
 *         - lose
 *         - null
 *       properties:
 *         image:
 *           type: string
 *           description: The picture of the equipe
 *         nom:
 *           type: string
 *           description: The name of the equipe
 *         description:
 *           type: string
 *           description: The description of the equipe
 *         point:
 *           type: Number
 *           description: The number of points of the equipe
 *         win:
 *           type: Number
 *           description: The number of wins
 *         lose:
 *           type: Number
 *           description: The number of losts
 *         null:
 *           type: Number
 *           description: The number of null
 *         score:
 *           type: Number
 *           description: The score of the equipe
 *         nbj:
 *           type: Number
 *           description: The number of players 
 *         appar:
 *           type: Boolean
 *           description: The equipe belongs to a ligue
 */

/**
 * @swagger
 * /equipes:
 *   post:
 *     summary: upload the list of all the equipes
 *     tags: [equipes]
 *     parameters:
 *       - in: path
 *         name: nom
 *         schema:
 *           type: string
 *         required: true
 *         description: The equipe name
 *     responses:
 *       200:
 *         description: The list of the equipes
 */
router.route('/').post(protect,ProprietaireDeStade,upload.single('image'),addEquipe)


/**
 * @swagger
 * /equipes:
 *   get:
 *     summary: Returns the list of all the equipes
 *     tags: [equipes]
 *     parameters:
 *       - in: path
 *         name: nom
 *         schema:
 *           type: string
 *         required: true
 *         description: The equipe name
 *     responses:
 *       200:
 *         description: The list of the equipes
 */
router.route('/').get(protect,getEquipe)
router.route('/my').get(protect,getMyequipe)


/**
 * @swagger
 * /equipes/{id}:
 *   get:
 *     summary: Get the equipe by id
 *     tags: [equipes]
 *     parameters:
 *       - in: path
 *         name: nom
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


// router.route('/').post(protect,ProprietaireDeStade,upload.single('image'),async(req,res)=>{
//       const{nom,discription /*equipecapacite*/} = req.body
  
//       const equipe = new Equipe({
//             image: req.file.path,
//             nom,
//           user:req.user._id,
//           discription,
//           //equipecapacite,
//           point:0,
//           win: 0,
//           lose: 0, 
//           null: 0 ,       
//       }) 
//       const createEquipe = await equipe.save()
//       res.status(201).json({createEquipe})
//   }           )
