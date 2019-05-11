const authRoutes = require("../routes/auth/authRoutes");

function routeConfig(app) {
  app.use("/auth", authRoutes);
}

module.exports = routeConfig;
