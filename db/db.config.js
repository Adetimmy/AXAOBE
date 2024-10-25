require('dotenv').config() 

module.exports = {
DB_NAME:process.env.DB,
DB_USERNAME: process.env.USERNAME,
DB_PASSWORD: process.env.PASSWORD,
DB_HOST: process.env.HOST,
DB_DIALET: process.env.DIALECT,
DB_PORT : process.env.PORT
}