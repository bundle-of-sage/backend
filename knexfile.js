require("dotenv").config();
const path = require("path");

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: process.env.PRODUCTION_DB_HOST,
      database: "postgres",
      port: 5432,
      user: process.env.PRODUCTION_DB_USER,
      password: process.env.PRODUCTION_DB_PASS,
      ssl: true
    },
    migrations: {
      directory: path.join(__dirname, "/server/db/migrations")
    }
  },
  production: {
    client: "postgresql",
    connection: {
      host: process.env.PRODUCTION_DB_HOST,
      database: "postgres",
      port: 5432,
      user: process.env.PRODUCTION_DB_USER,
      password: process.env.PRODUCTION_DB_PASS,
      ssl: true
    },
    migrations: {
      directory: path.join(__dirname, "/server/db/migrations")
    }
  }
};
