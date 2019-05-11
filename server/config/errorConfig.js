const cookieOptions = { httpOnly: true, maxAge: 1000 * 3600 * 24 * 180 };

function errorConfig(app) {
  app.use(function(err, req, res, next) {
    //If token cannot be verified, clear cookies
    if (err.name === "JsonWebTokenError") {
      res
        .status(401)
        .clearCookie("token", cookieOptions)
        .json({ message: "Please log in" });
    } else {
      next(err);
    }
  });
}

module.exports = errorConfig;
