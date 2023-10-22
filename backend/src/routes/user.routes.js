const express = require("express");
const userController = require("../controllers/user.controller");
const { jwt_verify, isAdmin } = require("../middlewares/auth");

const router = express.Router();

router.get("/", jwt_verify, userController.get_user);
router.get("/all", jwt_verify, isAdmin, userController.get_all_users);
router.get("/profile", jwt_verify, userController.get_profile);
router.post("/", userController.create_user);
router.post("/role/:id", jwt_verify, isAdmin, userController.updateUserRole);
router.delete("/:id", jwt_verify, isAdmin, userController.deleteUser);

module.exports = router;
