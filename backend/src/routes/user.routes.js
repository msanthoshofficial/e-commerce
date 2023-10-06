const express = require("express");
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth.jwt_verify, userController.get_user);
router.post("/", userController.create_user);

module.exports = router;