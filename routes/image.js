const express=require('express')
const upload =require('../middlewares/multer')
const {protect}= require('../middlewares/auth')
const{fileUpload,getImg,getAllImg}=require('../controllers/image')
//initialise router
const router=express.Router()
router.use(protect)
router.route('/').post(upload,fileUpload).get(getAllImg)
router.route('/:key').get(getImg)


module.exports=router
