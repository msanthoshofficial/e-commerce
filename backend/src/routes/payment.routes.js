const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const { jwt_verify } = require("../middlewares/auth");

router.post(
	"/create-payment-intent",
	jwt_verify,
	paymentController.createPaymentIntent
);

module.exports = router;
