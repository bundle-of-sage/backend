const knex = require("../../db/connection");

async function getUserProfile(req, res, next) {
  await console.log("USER: ", req.user);
  res.status(200).json({ user: { name: "John Snow", membership: false } });
}

module.exports = { getUserProfile };
