const express = require('express')
const router = express.Router() 







const { authUser,getuserProfile,registerUser,updateUserProfile,getusers,deleteUser,getUserById,updateUser} = require('../controllers/userController')
const {protect,ProprietaireDeStade} = require('../middlware/authmiddlware')
/** 
* @swagger

* / :
*   description: used to register user
*   post:
*    responses:
*     '200':
*        description: register success
*     '500':
*        description: register error        
*/
router.route('/').post(registerUser).get(protect,getusers)

/** 
* @swagger

* /login :
*   description: used to login user
*   post:
*   responses:
*     '200':
*        description: login success
*     '500' :
*        description: login error
        
*/
router.post('/login',authUser)

/** 
* @swagger

* /profile :
*   description: used to get user
*   get:
*   responses:
*     '200':
*        description: user success
*     '500' :
*        description: user error
        
*/
/** 
* @swagger

* /profile :
*   description: used to update user
*   put:
*   responses:
*     '200':
*        description: user updated
*     '500' :
*        description: error update
*/
router.route('/profile')
      .get(protect,getuserProfile)
      .put(protect,updateUserProfile)

/** 
* @swagger

* /:id :
*   description: used to update user
*   put:
*   responses:
*     '200':
*        description: user updated
*     '500' :
*        description: error update
*/
router.route('/:id').delete(protect,ProprietaireDeStade,deleteUser)
                  .get(protect,ProprietaireDeStade,getUserById)
                  .put(protect,ProprietaireDeStade,updateUser)
 
module.exports = router             