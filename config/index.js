require('dotenv').config({path:"./config/config.env"})

module.exports={
        NODE_ENV:process.env.NODE_ENV,
        PORT:process.env.PORT,
        JWT_SECRET:process.env.JWT_SECRET,
        DB_URL:process.env.DB_URL,
        JWT_EXPIRE:process.env.JWT_EXPIRE,
        COOKIE_EXPIRE:process.env.COOKIE_EXPIRE,
        MY_MAIL:process.env.MY_MAIL,
        MY_PASSWORD:process.env.MY_PASSWORD,
        FROM_EMAIL:process.env.FROM_EMAIL,
        FROM_NAME:process.env.FROM_NAME,
        SERVICE:process.env.SERVICE,
}