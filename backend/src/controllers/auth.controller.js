const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { User } = require("../models/user.models");

function jwt_generator(data) {
	const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
	return token;
}

exports.authenticate = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) throw new Error("Empty Email or Password");
		const hashed_password = await User.findOne(
			{ email: email },
			"password role"
		);
		if (!hashed_password) {
			return res.status(400).json({ message: "User Not Found" });
		}
		const is_valid = await bcrypt.compare(
			password,
			hashed_password.password
		);
		if (is_valid) {
			const token = jwt_generator({
				email: email,
				id: hashed_password.id,
				role: hashed_password.role,
			});
			res.cookie("token", token, {
				httpOnly: true,
				maxAge: 3600000,
				sameSite: "none",
				secure: true,
			}); // maxAge is in milliseconds (1 hour)
			await update_login_count(hashed_password.id);
			res.status(200).json({ message: "Login successful" });
		} else {
			res.status(400).json({ message: "Incorrect Password or Email" });
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: "Error logging in" });
	}
	next();
};

update_login_count = async (id) => {
	try {
		const user = await User.updateOne(
			{ _id: id },
			{ $inc: { login_count: 1 } }
		);
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};
