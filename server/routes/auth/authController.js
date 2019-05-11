const jwt = require("jsonwebtoken");
const cookieOptions = { httpOnly: true, maxAge: 1000 * 3600 * 24 * 180 };

async function checkAuthStatus(req, res, next) {
  res.status(200).json({ authorized: req.userId !== undefined });
}

async function signUp(req, res, next) {
  const { userId, firstName, lastName, email } = req.body.user;

  //Create token, set up cookie
  const token = jwt.sign({ userId }, process.env.APP_SECRET);
  res.cookie("token", token, cookieOptions);
  const user = { name: "John Snow" };
  res.status(200).json({ user });
}

async function login(req, res, next) {
  const { uid } = req.body.userInfo;
  const token = jwt.sign({ uid }, process.env.APP_SECRET);

  res.cookie("token", token, cookieOptions);

  res.status(200).json({ message: "Logged in" });
}

async function logout(req, res, next) {
  res
    .status(200)
    .clearCookie("token", cookieOptions)
    .json({
      message: "Logged Out"
    });
}

function test(req, res, next) {
  res.status(200).json({ message: "Connected successfully!" });
}

module.exports = { checkAuthStatus, login, logout, signUp, test };
