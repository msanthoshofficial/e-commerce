const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/rating.controller");
const { jwt_verify } = require("../middlewares/auth");

router.get("/:productId", jwt_verify, ratingController.getMyRating);

router.put("/:productId", jwt_verify, ratingController.updateMyRating);

module.exports = router;
