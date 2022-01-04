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

const { getLigue,getligueId,addLigue,addEquipeToLigue,creationDesMatch,getMyligue,getMatchesA,getMatchesB,classement,triClassement,deleteLigue} = require('../controllers/ligueController')
const {protect,ProprietaireDeStade} = require('../middlware/authmiddlware')


/**
 * @swagger
 * components:
 *   schemas:
 *     ligue:
 *       type: object
 *       required:
 *         - image
 *         - nom
 *         - description
 *       properties:
 *         image:
 *           type: string
 *           description: The picture of the ligue
 *         nom:
 *           type: string
 *           description: The name of the ligue
 *         description:
 *           type: string
 *           description: The description of the ligue
 */

 /**
  * @swagger
  * tags:
  *   name: ligues
  *   description: The ligues managing API
  */



//all
/**
 * @swagger
 * /ligue:
 *   get:
 *     summary: Returns the list of all the ligues
 *     tags: [ligues]
 *     responses:
 *       200:
 *         description: The list of the ligues
 */
router.route('/').get(getLigue).post(protect,ProprietaireDeStade,upload.single('image'),addLigue)

/**
 * @swagger
 * /ligues:
 *   put:
 *     summary: add equipe to ligue by id
 *     tags: [ligues]
 *     responses:
 *       200:
 *         description: ligue added
 */
router.route('/:id').put(protect,ProprietaireDeStade,addEquipeToLigue)

router.route('/my').get(protect,getMyligue)


//one
router.route('/classement').put(protect,classement)


/**
 * @swagger
 * /ligue/{id}:
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
router.route('/:id').get(getligueId)
router.route('/up/:id').put(protect,creationDesMatch)
router.route('/Als/:id').get(protect,getMatchesA)
router.route('/Bls/:id').get(protect,getMatchesB)

router.route('/tri/:id').get(protect,triClassement)

/**
 * @swagger
 * /ligues/{id}:
 *   delete:
 *     summary: delete the ligue by id
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
router.route('/deleteligue/:id').delete(protect,deleteLigue)



module.exports = router             

