const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		payment_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Payment",
			required: true,
		},
		product: {
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

		order_status: {
			type: String,
			required: true,
			default: "Processing",
			enum: ["Processing", "Shipped", "Delivered"],
		},
		// Add other fields as needed
	},
	{ collection: "orders", timestamps: true }
);

exports.Order = mongoose.model("Order", orderSchema);
