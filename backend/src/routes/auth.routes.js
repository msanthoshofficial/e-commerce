const express = require("express");
const authController = require("../controllers/auth.controller");
const { jwt_verify } = require("../middlewares/auth");

const router = express.Router();

router.post("/login", authController.authenticate);
router.get("/login", jwt_verify, (req, res) =>
	res.json({ message: "Authenticated", role: req.role })
);

module.exports = router;
