const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		payment_id: {
			type: String,
			required: true,
			unique: true,
		},
		user_id: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		product: {
			type: String,
			required: true,
		},
		// Add other fields as needed
	},
	{ collection: "orders", timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
