const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: false,
		},
		address: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		profile_picture: {
			type: String,
			required: false,
		},
		content_type: {
			type: String,
			required: false,
		},
		role: {
			type: String,
			required: true,
		},
	},
	{ collection: "users", timestamps: true }
);
const userProfileSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		profile_picture: {
			type: String,
			required: true,
		},
		content_type: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
	},
	{ collection: "users" }
);

exports.User = mongoose.model("users", userSchema);
exports.UserProfile = mongoose.model("userProfile", userProfileSchema);
