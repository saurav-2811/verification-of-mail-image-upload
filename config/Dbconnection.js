const mongoose=require('mongoose')
const{DB_URL}=require('./index')
const connectDb=async()=>{
    const conn=await mongoose.connect(DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify:false
    })
    console.info(`db is connected...`)
}
module.exports=connectDb