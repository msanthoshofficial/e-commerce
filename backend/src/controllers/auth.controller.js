const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const user_model = require("../models/user.models");

function jwt_generator(data) {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
}

const authenticate = async (req, res, next) => {
  const { email, password } = req.body;
  const hashed_password = await user_model.User.findOne(
    { email: email },
    "password"
  );
  const is_valid = await bcrypt.compare(password, hashed_password.password);
  if (is_valid) {
    const token = jwt_generator({ email: email });
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // maxAge is in milliseconds (1 hour)
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(400).json({ message: "Error logging in" });
  }
  next();
};

module.exports = {
  authenticate: authenticate,
};
