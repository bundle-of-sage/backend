const express = require("express");
const router = express.Router();
const userController = require("./userController");

router
  .get("/", userController.getUserProfile)
  .post("/payment", userController.chargePayment);

module.exports = router;
