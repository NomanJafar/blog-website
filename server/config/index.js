const dotenv = require('dotenv').config();
const PORT = process.env.PORT;
const DATABASE_NAME = process.env.DATABASE_NAME;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const JWT_TOKEN_SECRET_KEY = process.env.JWT_TOKEN_SECRET_KEY;
module.exports = {
    PORT,
    DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    JWT_TOKEN_SECRET_KEY,
};
