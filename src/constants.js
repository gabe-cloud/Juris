require("dotenv/config");

const ENV = {
  IS_DEVELOPMENT: process.env.IS_DEVELOPMENT === "true",
  DATABASE_NAME: process.env.DATABASE_NAME,
  HOST_DB: process.env.IS_DEVELOPMENT ? process.env.HOST_DB : "localhost",
  PORT_DB: process.env.PORT_DB,
  USER_DB: process.env.USER_DB,
  PASSWORD_DB: process.env.PASSWORD_DB,
};

module.exports = ENV;
