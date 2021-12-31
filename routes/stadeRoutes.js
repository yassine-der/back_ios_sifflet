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

const { getStade,getStadeId,addStade,updateStadeToPaid,getMystade,addLigueToStade} = require('../controllers/stadeController')
const {protect,ProprietaireDeStade } = require('../middlware/authmiddlware')
//all
router.route('/').get(protect,getStade).post(protect,upload.single('image'),addStade)
router.route('/my').get(protect,getMystade)
//one
router.route('/:id').get(protect,getStadeId).put(protect,addLigueToStade)
router.route('/:id/pay').put(protect,updateStadeToPaid)

  
module.exports = router             

