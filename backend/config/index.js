const dotenv = require("dotenv");

dotenv.config()




module.exports={
PORT : process.env.PORT ,
DEBUG_MODE : process.env.DEBUG_MODE ,
// DB_URL : process.env.DB_URL ,
// JWT_SECRET : process.env.JWT_SECRET,
// REFRESH_TOKENS : process.env.REFRESH_TOKENS
}