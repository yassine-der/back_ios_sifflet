const express = require('express')
const router = express.Router() 

const { getArbitre,getArbitreId } = require('../controllers/arbitreController')
//all
router.route('/').get(getArbitre)
//one
router.route('/:id').get(getArbitreId)

module.exports = router             

