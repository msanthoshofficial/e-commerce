const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
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
	},
	{ collection: "cart", timestamps: true }
);

exports.cartModel = mongoose.model("cart", cartSchema);
