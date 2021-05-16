const mongoose = require("mongoose");
const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utilities/errorResponse");
const User = require("../models/User")
const sendTokenResponse = require("../utilities/helper");

const sendEmail = require("../utilities/sendEmail");

const crypto = require("crypto");
const { JWT_SECRET } = require("../config/index");

//@desc         create user
//@route        post on /auth/register
//access        public

module.exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({
    success: true,
    data: user,
  });
});

//@desc         login user
//@route        post on /auth/login
//access        public
module.exports.login = asyncHandler(async (req, res, next) => {
  //taking out name,email,password,role from req.body
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    return next(new ErrorResponse("Please provide credentials", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("invalid credentials", 401));
  }
  const ismatch = await user.matchpassword(password);
  if (!ismatch) {
    return next(new ErrorResponse("invalid credentials", 401));
  }
  sendTokenResponse(user, 200, res);
});

//@desc         logout user
//@route        post on /auth/logout
//access        public
module.exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

//@desc         send mail
//@route        get on /api/v1/auth/verification
//access        private
module.exports.sendMail = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });
  if (!user) {
    return next(new ErrorResponse("user not found", 404));
  }
  if(user.verification){
    return next(new ErrorResponse("already verified", 404));
  }
  const verifyToken = user.genVerifyToken();
  await user.save({ validateBeforeSave: false });
  const URL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/verify/${verifyToken}`;
  const message =
    "Please click on verify to verify your account and start uploading photo";
  try {
    await sendEmail({
      email: user.email,
      subject: "mail confirmation",
      message,
      URL,
    });
    return res.status(200).json({
      success: true,
      data: "email sent successfully please verify your email to register",
    });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse(`email could not be sent`, 500));
  }
});

//@desc         verify email
//@route        get on /api/v1/auth/verify/:verifytoken
//access        public
module.exports.verifyMail = asyncHandler(async (req, res, next) => {
  const verifyToken = req.params.verifytoken;

  const VerifyMailToken = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(verifyToken)
    .digest("hex");
  const user = await User.findOne({ VerifyMailToken });
  if (!user) {
    return next(new ErrorResponse("invalid token", 404));
  }
  if (user.VerifyMailTokenExpire < Date.now()) {
    return next(
      new ErrorResponse(
        "token expires please generate new token to verify",
        404
      )
    );
  }
  user.verification = true;
  user.VerifyMailToken = undefined;
  user.VerifyMailTokenExpire = undefined;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    data: `${user.email} is now verified`,
  });
});

