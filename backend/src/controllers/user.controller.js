const bcrypt = require("bcrypt");
const { User, UserProfile } = require("../models/user.models");
const multer = require("multer");

// Multer setup for image uploads
const storage = multer.memoryStorage();
const upload = multer({
	dest: "./images",
	storage: storage,
	limits: {
		fileSize: 1 * 1024 * 1024, // 1 MB limit
	},
	fileFilter: (req, file, cb) => {
		const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

		if (allowedTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(
				new Error(
					"Invalid file type. Only JPEG, PNG, and JPG are allowed."
				)
			);
		}
	},
}).single("profile_picture");

exports.create_user = async (req, res) => {
	try {
		upload(req, res, async function (err) {
			if (err) {
				return res.status(500).json({
					message:
						"Can't Create Product. Only JPG, JPEG, PNG files within 1mb are supported",
				});
			}
			if (!req.file) {
				return res
					.status(400)
					.json({ error: "No profile image provided" });
			}
			const profile_picture = req.file.buffer.toString("base64");
			const content_type = req.file.mimetype;
			var { email, password, phone, address, role } = req.body;
			const username = email.split("@")[0];

			// Check if the email is already in use
			const existingUser = await UserProfile.findOne({ email });
			if (existingUser) {
				return res
					.status(400)
					.json({ error: "Email address is already in use" });
			}

			password = await bcrypt.hash(password, 10);
			if (role != "customer" && role != "seller") {
				throw new Error("Invalid Role");
			}
			const user = new UserProfile({
				username,
				phone,
				address,
				profile_picture,
				content_type,
				email,
				password,
				role,
			});
			await user.save();
			return res
				.status(201)
				.json({ message: "User created successfully" });
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Can't Create User" });
	}
};

exports.get_user = async (req, res, next) => {
	try {
		const email = req.email;
		const user = await User.findOne(
			{ email: email },
			"username email role"
		);
		res.status(200).json(user);
	} catch (err) {
		res.status(404).json({ message: "User Not Found" });
	}
	next();
};

exports.get_profile = async (req, res, next) => {
	try {
		const email = req.email;
		var user = await User.findOne(
			{ email: email },
			"username email profile_picture phone address content_type role"
		);
		user["profile_picture"] = user["profile_picture"].toString("base64");
		res.status(200).json(user);
	} catch (err) {
		res.status(404).json({ message: "User Not Found" });
	}
};

exports.get_all_users = async (req, res) => {
	try {
		const users = await User.find({}, "username phone email role");
		return res.status(200).json(users);
	} catch (err) {
		return res.status(404).json({ message: "Users Not Found" });
	}
};

exports.updateUserRole = async (req, res) => {
	try {
		const user_id = req.params.id;
		const { role } = req.body;
		if (role != "customer" && role != "seller" && role != "admin") {
			return res.status(400).json({ message: "Invalid Role" });
		}
		const user = await User.findOneAndUpdate(
			{ _id: user_id },
			{ role: role }
		);
		return res.status(200).json(user);
	} catch (err) {
		return res.status(404).json({ message: "User Not Found" });
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const user_id = req.params.id;
		const user = await User.findOneAndDelete({ _id: user_id });
		return res.status(200).json(user);
	} catch (err) {
		return res.status(404).json({ message: "User Not Found" });
	}
};
