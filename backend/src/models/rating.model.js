const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
	{
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		product_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 0,
			max: 5,
		},
	},
	{ collection: "ratings", timestamps: true }
);

exports.ratingModel = mongoose.model("ratings", ratingSchema);
