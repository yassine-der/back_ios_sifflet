const express = require('express')
const router = express.Router() 







const { authUser,getuserProfile,registerUser,updateUserProfile,getusers,deleteUser,getUserById,updateUser} = require('../controllers/userController')
const {protect,ProprietaireDeStade} = require('../middlware/authmiddlware')

router.route('/').post(registerUser).get(protect,getusers)


router.post('/login',authUser)


router.route('/profile')
      .get(protect,getuserProfile)
      .put(protect,updateUserProfile)

router.route('/:id').delete(protect,ProprietaireDeStade,deleteUser)
                  .get(protect,ProprietaireDeStade,getUserById)
                  .put(protect,ProprietaireDeStade,updateUser)
 
module.exports = router             