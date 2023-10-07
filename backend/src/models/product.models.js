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
			required: true,
		},
		image: {
			type: String, // image as a base64 string
			required: true,
		},
		seller_id: {
			type: String,
			required: true,
		},
		content_type: {
			type: String,
			required: true,
		},
	},
	{ collection: "products" }
);

exports.Product = mongoose.model("products", productSchema);
