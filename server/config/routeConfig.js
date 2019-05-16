const authRoutes = require("../routes/auth/authRoutes");
const userRoutes = require("../routes/user/userRoutes");

function routeConfig(app) {
  app.use("/auth", authRoutes);
  app.use("/user", userRoutes);
}

module.exports = routeConfig;
