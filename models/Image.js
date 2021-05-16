const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
key:{
    type: String,
    default: 'no-photo.jpg'
},
url:{
    type: String,
},
user:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:true
},
imageExpire:Date,
createdAt: {
    type: Date,
    default: Date.now,
  },
})
imageSchema.pre('save',async function(next){
    this.imageExpire=Date.now()+2*3600*1000
})
module.exports=mongoose.model('image',imageSchema)