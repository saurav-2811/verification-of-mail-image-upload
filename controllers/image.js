const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utilities/errorResponse");
const {uploadFile}= require('../services/s3')
const Image = require("../models/Image");


module.exports.fileUpload = asyncHandler(async (req, res, next) => {
      if(!req.user || req.user.verification===false){
        return next(new ErrorResponse('only verified logged in user can upload photo'))
      }
      if(!req.file){
        return next(new ErrorResponse("please upload an image",404))
      }
      const file=req.file
      try {
        const img=await Image.create({name:file.filename,user:req.user._id})
        if(!img){
          return next(new ErrorResponse("unable to save image in db",500))
        }
        const result=await uploadFile(file)
        if(!result){
          return next(new ErrorResponse("unable to uload image",500))
        }
        console.log(img,result);
        res.status(200).json({
          success: true,
          url:result.Location
        })
        
      } catch (err) {
        console.log(err);
      }
    });


    module.exports.getImg = asyncHandler(async (req, res, next) => {
      const image=await Image.findById(req.params.id)
      if(!image){
        return next(new ErrorResponse(`no image found with this id: ${req.params.id}`,404))
      }
      if(image.imageExpire<=Date.now()){
        await image.remove()
        return next(new ErrorResponse(`this image is expired and deleted`,404))
      }
      try {
        const key=image.filename
        
        // console.log(readStream);
      } catch (err) {
       console.log(err); 
      }
    })