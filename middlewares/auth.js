const jwt= require ('jsonwebtoken')
const asyncHandler= require('./async')
const{JWT_SECRET}=require('../config/index')
const ErrorResponse= require('../utilities/errorResponse')
const User= require('../models/User')
//protect routes
exports.protect=asyncHandler(async(req,res,next) =>{
    let token;
    if(
        req.headers.authorization &&
         req.headers.authorization.startsWith('Bearer')
         ){
        token=req.headers.authorization.split(' ')[1];

    }
    else if(req.cookies.token){
        token=req.cookies.token
    }
    //make sure token exist
    if(!token){
        return next( new ErrorResponse('Not authorised to access this route',401))
    }
    try {
        //veryfy token
        const decoded=jwt.verify(token,JWT_SECRET)
        req.user=await User.findById(decoded.id);
        next()
    } catch (err) {
        return next(new ErrorResponse('Not authorised to access this route',401))
    }
})