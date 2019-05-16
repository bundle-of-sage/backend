const jwt = require("jsonwebtoken");
const knex = require("../db/connection");

function verifyToken(req, res, next) {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
}

async function attachUserToRequest(req, res, next) {
  // Skip if no user attached to request
  if (!req.userId) return next();
  try {
    const user = await knex("users")
      .where({ user_id: req.user_id })
      .first();
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { verifyToken, attachUserToRequest };
