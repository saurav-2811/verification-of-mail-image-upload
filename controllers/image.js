const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utilities/errorResponse");
const aws = require("aws-sdk");

const {uploadFile}= require('../services/s3')
const Image = require("../models/Image");


module.exports.fileUpload = asyncHandler(async (req, res, next) => {
      if(!req.file){
        console.log("error");
      }
      const file=req.file
      console.log(file);
      try {
        const result=await uploadFile(file)
        console.log(result)
        res.status(200).json({
          success: true,
          // data:file.location
        })
        
      } catch (err) {
        console.log(err);
      }
    });
