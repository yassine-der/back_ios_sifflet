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

const { getLigue,getligueId,addLigue, addEquipeToLique,creationDesMatch } = require('../controllers/ligueController')
const {protect,ProprietaireDeStade} = require('../middlware/authmiddlware')

//all
router.route('/').get(getLigue).post(protect,ProprietaireDeStade,upload.single('image'),addLigue)
//one
router.route('/:id').get(getligueId).put(protect,ProprietaireDeStade,addEquipeToLique)
router.route('/up/:id').put(protect,ProprietaireDeStade,creationDesMatch)
//router.route('/ls/:id').get(findliguebystade).put(protect,ProprietaireDeStade,addLigueToStade)


module.exports = router             

