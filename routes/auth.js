const express=require('express')
const {protect}= require('../middlewares/auth')
const{register,login,logout,sendMail,verifyMail,fl}=require('../controllers/auth')
//initialise router
const router=express.Router()
router.route('/register').post(register)
router.route('/login').post(login)

router.route('/logout').get(logout)
router.route('/verification').get(protect,sendMail)
router.route('/verify/:verifytoken').get(verifyMail)
module.exports=router
