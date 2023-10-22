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
			min: 0,
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
		products: [
			{
				product_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				seller_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: { type: Number, default: 1 },
			},
		],
		// Add other fields as needed
	},
	{ collection: "payments", timestamps: true }
);

exports.Payment = mongoose.model("Payments", paymentSchema);
