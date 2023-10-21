const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		payment_status: {
			type: String,
			required: false,
			default: "pending",
		},
		stripe_id: {
			type: String,
			required: false,
		},
		// Add other fields as needed
	},
	{ collection: "payments", timestamps: true }
);

const Payment = mongoose.model("Payments", paymentSchema);

module.exports = Payment;
