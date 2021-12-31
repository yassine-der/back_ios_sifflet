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

//all
router.route('/').post(protect,ProprietaireDeStade,upload.single('image'),addEquipe)
router.route('/').get(protect,getEquipe)
router.route('/my').get(protect,getMyequipe)

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
