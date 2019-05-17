const jwt = require("jsonwebtoken");
const knex = require("../../db/connection");
const cookieOptions = { httpOnly: true, maxAge: 1000 * 3600 * 24 * 180 };

async function checkAuthStatus(req, res, next) {
  const activeMembership = req.userId
    ? await getMembershipStatus(req.userId)
    : false;
  res
    .status(200)
    .json({ authorized: req.userId !== undefined, activeMembership });
}

async function login(req, res, next) {
  try {
    //Has Existing Account?
    const { userInfo } = req.body;
    const user = await checkIfUserHasAccount(userInfo.uid);
    //Previous User
    if (user) {
      const token = jwt.sign({ userId: userInfo.uid }, process.env.APP_SECRET);
      res.cookie("token", token, cookieOptions);
      res.status(200).json({ user });
    }
    //New User
    else {
      const user = await createNewUser(userInfo);
      res.status(200).json({ user });
    }
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  res
    .status(200)
    .clearCookie("token", cookieOptions)
    .json({
      message: "Logged Out"
    });
}

async function checkIfUserHasAccount(user_id) {
  const userResponse = await knex("users")
    .where({ user_id })
    .first();
  if (userResponse) return userResponse;
  else return false;
}

async function getMembershipStatus(user_id) {
  const response = await knex("users")
    .select("membership_paid")
    .where({ user_id })
    .first();
  if (response.membership_paid) return true;
  else return false;
}

async function createNewUser(userInfo) {
  const { uid, displayName, email, photoURL } = userInfo;
  const splitDisplayName = displayName.split(" ");
  const first_name = splitDisplayName[0] || "User";
  const last_name = splitDisplayName[1] || "";

  const [user] = await knex("users")
    .insert({
      user_id: uid,
      first_name,
      last_name,
      email,
      profile_photo_url: photoURL
    })
    .returning("*");
  return user;
}

module.exports = { checkAuthStatus, login, logout };
