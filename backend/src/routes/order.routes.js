// routes/order.routes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { jwt_verify, isSellerOrAdmin } = require("../middlewares/auth");

router.get("/count", jwt_verify, orderController.getMyOrderCount);
router.get("/", jwt_verify, orderController.getMyOrders);
router.get(
	"/seller",
	jwt_verify,
	isSellerOrAdmin,
	orderController.getSellerOrders
);
router.post(
	"/:order_id",
	jwt_verify,
	isSellerOrAdmin,
	orderController.updateOrderStatus
);

module.exports = router;
