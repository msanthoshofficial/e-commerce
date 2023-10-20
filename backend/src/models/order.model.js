const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		products: [
			{
				product_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "products",
					required: true,
				},
				quantity: { type: Number, default: 1 },
			},
		],
		payment_status: {
			type: String,
			required: false,
			default: "pending",
		},
		order_status: {
			type: String,
			required: false,
			default: "pending",
		},
		// Add other fields as needed
	},
	{ collection: "orders", timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
