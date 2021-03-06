const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const logger = require("./logger");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { verifyToken, attachUserToRequest } = require("./customMiddleware");

function mainConfig(app) {
  app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

  app.use(cookieParser());

  app.use(json());

  app.use(urlencoded({ extended: false }));

  if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev", { stream: logger.stream }));
  }

  app.use(verifyToken);

  app.use(attachUserToRequest);
}

module.exports = mainConfig;
