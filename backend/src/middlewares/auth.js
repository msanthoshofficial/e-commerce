var jwt = require("jsonwebtoken");

const jwt_verify = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
    jwt_verify: jwt_verify
}
