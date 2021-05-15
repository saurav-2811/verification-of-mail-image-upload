const express=require('express')
const upload =require('../middlewares/multer')
const {protect}= require('../middlewares/auth')
const{fileUpload,getImg}=require('../controllers/image')
//initialise router
const router=express.Router()
router.use(protect)
router.route('/').post(upload,fileUpload)
router.route('/:id').get(getImg)


module.exports=router
