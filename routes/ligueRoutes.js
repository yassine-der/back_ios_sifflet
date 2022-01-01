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

//all
router.route('/').get(getLigue).post(protect,ProprietaireDeStade,upload.single('image'),addLigue)
router.route('/:id').put(protect,ProprietaireDeStade,addEquipeToLigue)

router.route('/my').get(protect,getMyligue)
//one
router.route('/classement').put(protect,classement)

router.route('/:id').get(getligueId)
router.route('/up/:id').put(protect,creationDesMatch)
router.route('/Als/:id').get(protect,getMatchesA)
router.route('/Bls/:id').get(protect,getMatchesB)

router.route('/tri/:id').get(protect,triClassement)
router.route('/deleteligue/:id').delete(protect,deleteLigue)



module.exports = router             

