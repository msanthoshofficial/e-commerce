const express = require("express");
const userController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth.jwt_verify, userController.get_user);
router.get("/all", auth.jwt_verify, userController.get_all_users);
router.get("/profile", auth.jwt_verify, userController.get_profile);
router.post("/", userController.create_user);
router.post("/role/:id", auth.jwt_verify, userController.updateUserRole);
router.delete("/:id", auth.jwt_verify, userController.deleteUser);

module.exports = router;
