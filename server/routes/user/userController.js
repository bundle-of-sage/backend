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
    let { status } = await stripe.charges.create({
      amount: 5000,
      currency: "usd",
      description: "Membership Access to Bundle of Sage",
      source: token
    });
    console.log("Stripe Payment Status: ", status);
    //Handle 200, 500
    res.status(200).json({ status });
  } catch (error) {
    console.log("Stripe Error: ", error);
    next(error);
  }
}

module.exports = { getUserProfile, chargePayment };
