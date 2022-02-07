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

const { authUser,getuserProfile,registerUser,updateUserProfile,getusers,deleteUser,getUserById,updateUser,googleLogin,verifEmail,motdepasseOublier,updateUserPassword} = require('../controllers/userController')
const {protect,ProprietaireDeStade} = require('../middlware/authmiddlware')
router.route('/').post(upload.single('image'),registerUser).get(protect,getusers)
router.post('/login',authUser)
router.route('/profile')
      .get(protect,getuserProfile)
      .put(protect,updateUserProfile)
      router.route('/motDePasseOublier').put(motdepasseOublier)
      router.route('/hupdatemote').put(updateUserPassword)

router.route('/:id').delete(protect,deleteUser)
                  .get(protect,getUserById)
                  .put(updateUser)
router.route('/google').post(googleLogin)
router.route('/verifEmail/:id').patch(verifEmail)


module.exports = router              