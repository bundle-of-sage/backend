const environment = process.env.NODE_ENV;
const config = require("../../knexfile")["production"];
module.exports = require("knex")(config);
