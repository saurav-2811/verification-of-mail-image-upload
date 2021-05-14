const express=require('express')
const Logger=require('morgan')
const cookieParser= require ('cookie-parser')
const errorHandler=require('./middlewares/error')
const auth=require('./routes/auth')
//bringing db connection
const connectDb=require('./config/Dbconnection')
const app=express();
app.use(express.urlencoded({ extended: true }));
//cookie parser
app.use(cookieParser())
//body parser
app.use(express.json());
//bringing config variable
const {NODE_ENV,PORT}= require('./config/index')


app.use('/api/v1/auth',auth)
//loger use
if(NODE_ENV){
    app.use(Logger('dev'))
}
//connection
connectDb()
//useing middleware error
app.use(errorHandler)

//starting server
const server=async ()=>{
    try {
        await app.listen(PORT,()=>{
            console.log(`server is running on ${NODE_ENV} mode at ${PORT}`);
        });
        } catch (error) {
            console.log(error);
        }       
}
server();