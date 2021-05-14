const express=require('express')
const upload =require('../middlewares/multer')
const {protect}= require('../middlewares/auth')
const{fileUpload}=require('../controllers/image')
//initialise router
const router=express.Router()
router.post('/',upload,fileUpload)


module.exports=router
