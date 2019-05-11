const express = require("express");
const router = express.Router();
const authController = require("./authController");

router
  .get("/status", authController.checkAuthStatus)
  .get("/logout", authController.logout)
  .post("/login", authController.login)
  .post("/sign-up", authController.signUp);

module.exports = router;
