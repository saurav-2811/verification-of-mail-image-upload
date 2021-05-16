const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utilities/errorResponse");
const { uploadFile, deleteFile } = require('../services/s3')
const Image = require("../models/Image");

//@desc         create upload image
//@route        post on /api/v1/image
//access        only in loggedin verified user

module.exports.fileUpload = asyncHandler(async (req, res, next) => {
  if (!req.user || req.user.verification === false) {
    return next(new ErrorResponse('only verified logged in user can upload photo'))
  }
  if (!req.file) {
    return next(new ErrorResponse("please upload an image", 404))
  }
  const check = await Image.find()
  if (check.length >= 20) {
    return next(new ErrorResponse("you already upload 20 images and one user can upload only 20 images", 404))
  }
  const file = req.file
  try {
    const result = await uploadFile(file)
    const img = await Image.create({ key: file.filename, user: req.user._id, url: result.Location })
    if (!img) {
      return next(new ErrorResponse("unable to save image in db", 500))
    }
    if (!result) {
      return next(new ErrorResponse("unable to uload image", 500))
    }
    res.status(200).json({
      success: true,
      data: img
    })

  } catch (err) {
    console.log(err);
  }
});

//@desc         create get image 
//@route        get on /api/v1/image/:key
//access        only in loggedin verified user
module.exports.getImg = asyncHandler(async (req, res, next) => {
  const image = await Image.findOne({ key: req.params.key })
  console.log(image)
  if (!image) {
    return next(new ErrorResponse(`no image found with this id: ${req.params.key}`, 404))
  }
  //delete image if got expires
  if (image.imageExpire <= Date.now()) {
    await deleteFile(image.key)
    await image.remove()
    return next(new ErrorResponse(`this image is expired and deleted`, 404))
  }
  res.status(200).json({
    success: true,
    data: image.url
  })
})





//@desc         create get allimage 
//@route        get on /api/v1/image/
//access        only in loggedin verified user
module.exports.getAllImg = asyncHandler(async (req, res, next) => {
  const image = await Image.find({ imageExpire: { $gt: Date.now() } })
  if (!image) {
    return next(new ErrorResponse(`no image found`, 404))
  }
  await (await Image.find()).forEach(async (img) => {
    // delete image if got expires
    if (img.imageExpire <= Date.now()) {
      await deleteFile(img.key)
      await img.remove()
    }
  })

  res.status(200).json({
    success: true,
    count: image.length,
    data: image
  })
})




