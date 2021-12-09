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

const {getEquipe, getEquipeId,addEquipe,deleteEquipe,addJoueurToEquipe} = require('../controllers/equipeController')
const {protect,ProprietaireDeStade} = require('../middlware/authmiddlware')

//all
router.route('/').get(protect,getEquipe).post(protect,ProprietaireDeStade,upload.single('image'),addEquipe)
//one
router.route('/:id').get(getEquipeId,protect).put(protect,addJoueurToEquipe)

module.exports = router             

