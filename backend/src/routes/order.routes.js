// routes/order.routes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const auth = require("../middlewares/auth");

router.get("/", auth.jwt_verify, orderController.getMyOrders);
router.get("/seller", auth.jwt_verify, orderController.getSellerOrders);
router.post("/:status", auth.jwt_verify, orderController.updateOrderStatus);

module.exports = router;
