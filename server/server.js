const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const app = express();

const mainConfig = require("./config/mainConfig");
const routeConfig = require("./config/routeConfig");
const errorConfig = require("./config/errorConfig");
mainConfig(app);
routeConfig(app);
errorConfig(app);

module.exports = app;
