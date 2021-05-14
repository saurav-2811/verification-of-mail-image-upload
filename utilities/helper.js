

const {NODE_ENV,COOKIE_EXPIRE}=require('../config/index')
//get token from model,create cookie and send response
const sendTokenResponse=(user,statusCode,res)=>{
    //create token
    const token=user.getJwtToken()
    const options={
        expires:new Date(Date.now()+COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true
    };
   
    if(NODE_ENV==='production'){
        options.secure=true
    }
    res
    .status(statusCode)
    .cookie('token',token,options)
    .json({
        success:true,
        token:token
    })
}
module.exports=sendTokenResponse




