/*const express =require('express')
const multer = require('multer')
const router = express.Router()
const path = require('path')

const storage = multer.diskStorage({
    destination(req,file, cb){
        cb(null,'uploads')
    },
    filename(req,file,cb){
        cb(null,`${file.fildname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
function checkFileType(file,cb){
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase)
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null,true)
    }else{
        cb('Imges only!')
    }
}
const upload = multer({
    storage,
    fileFilter : function(req,file,cb){
            checkFileType(file,cb)
    }
})

/*
const upload = multer()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

router.post('/',upload.single('photo'),(req,res)=>{
    res.send(`/${req.file.path}`)
})

module.exports = router
*/