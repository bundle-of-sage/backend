const knex = require("../../db/connection");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function getUserProfile(req, res, next) {
  try {
    res.status(200).json({ user: req.user || {} });
  } catch (error) {
    next(error);
  }
}

async function chargePayment(req, res, next) {
  try {
    const { token } = req.body.token;
    const { status } = await stripe.charges.create({
      amount: 5000,
      currency: "usd",
      description: "Membership Access to Bundle of Sage",
      source: token
    });
    if (status === "succeeded") {
      await knex("users")
        .update({ membership_paid: true })
        .where({ user_id: req.userId });
      return res.status(200).json({ message: "Payment successful" });
    } else res.sendStatus(402);
  } catch (error) {
    const errorMessage =
      error.message ||
      "We are having trouble processing your payment. Please try again later.";
    res.status(402).send({ errorMessage });
    next(error);
  }
}

module.exports = { getUserProfile, chargePayment };
