const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
name:{
    type: String,
    default: 'no-photo.jpg'
},
user:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:true
}
})
module.exports=mongoose.model('image',imageSchema)