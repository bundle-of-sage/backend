const knex = require("../../db/connection");

async function getUserProfile(req, res, next) {
  try {
    res.status(200).json({ user: req.user || {} });
  } catch (error) {
    next(error);
  }
}

module.exports = { getUserProfile };
