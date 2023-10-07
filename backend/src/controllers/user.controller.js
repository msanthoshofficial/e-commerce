const bcrypt = require("bcrypt");
const user_model = require("../models/user.models");
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
			//const profile_picture = req.file.buffer;
			const content_type = req.file.mimetype;
			var { email, password, phone, address, role } = req.body;
			const username = email.split("@")[0];
			password = await bcrypt.hash(password, 10);
			if (role != "customer" && role != "seller") {
				throw new Error("Invalid Role");
			}
			const user = new user_model.UserProfile({
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
		return res.status(500).json({ message: "Cant Create User" });
	}
};

exports.get_user = async (req, res, next) => {
	try {
		const email = req.email;
		const user = await user_model.User.findOne(
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
		var user = await user_model.User.findOne(
			{ email: email },
			"username email profile_picture phone address content_type role"
		);
		user["profile_picture"] = user["profile_picture"].toString("base64");
		res.status(200).json(user);
	} catch (err) {
		res.status(404).json({ message: "User Not Found" });
	}
};
