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

exports.isSeller = async (req, res, next) => {
	if (req.role != "seller") {
		res.status(403).json({ message: "Forbidden" });
	}
	next();
};
exports.isAdmin = async (req, res, next) => {
	if (req.role != "admin") {
		res.status(403).json({ message: "Forbidden" });
	}
	next();
};

exports.isSellerOrAdmin = async (req, res, next) => {
	if (req.role != "admin" && req.role != "seller") {
		res.status(403).json({ message: "Forbidden" });
	}
	next();
};
