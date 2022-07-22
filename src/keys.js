const ENV = require("./constants");

module.exports = {
  database: {
    host: ENV.HOST_DB,
    port: ENV.PORT_DB,
    user: ENV.USER_DB,
    password: ENV.PASSWORD_DB,
    database: ENV.DATABASE_NAME,
  },
};
