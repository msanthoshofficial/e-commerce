var jwt = require("jsonwebtoken");

exports.jwt_verify = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		const decoded = await jwt.verify(token, process.env.JWT_SECRET);
		req.email = decoded.email;
		req.id = decoded.id;
		req.role = decoded.role;
		if (!req.email || !req.id) throw new Error("Unauthorized");
		next();
	} catch (error) {
		res.status(401).json({ message: "Unauthorized" });
	}
};
