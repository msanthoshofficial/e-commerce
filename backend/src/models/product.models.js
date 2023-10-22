const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		rating: {
			type: Number,
			required: false,
			min: 0,
			max: 5,
		},
		quantity: {
			type: Number,
			required: true,
		},
		image: {
			type: String, // image as a base64 string
			required: true,
		},
		seller_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},
		content_type: {
			type: String,
			required: true,
		},
	},
	{ collection: "products", timestamps: true }
);

exports.Product = mongoose.model("products", productSchema);
