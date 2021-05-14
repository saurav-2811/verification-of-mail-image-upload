const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { JWT_SECRET, JWT_EXPIRE } = require("../config/index");
const jwt = require("jsonwebtoken");
const Userschema = new mongoose.Schema({
  name: {
    type: String,
    maxlength:[50,'name should not contain more than 50 letters'],
    trime: true,
    required: [true,'please add a name']
  },
  image:{
    type: String,
    default: 'no-photo.jpg'
  },
  email: {
    type: String,
    required: [true, "Please add a email"],
    unique: true,
    match: [/^\S+@\S+\.\S+/, "Please add an valid email"],
  },
  verification:{
    type:Boolean,
    required: true,
    default:false
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength:[6,'password should be minimum 6 in length '],
    select: false,
  },
  VerifyMailToken: String,
  VerifyMailTokenExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
Userschema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

Userschema.methods.getJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE }
  );
};
Userschema.methods.matchpassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};

//generate resetPassword token
Userschema.methods.genVerifyToken = function () {
  const verifyToken = crypto.randomBytes(20).toString("hex");

  this.VerifyMailToken = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(verifyToken)
    .digest("hex");
  this.VerifyMailTokenExpire = Date.now() + 10 * 60 * 1000;
  return verifyToken;
};
module.exports = mongoose.model("User", Userschema);
