const express = require("express");

const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const productRoutes = require("./product.routes");
const cartRoutes = require("./cart.routes");
const paymentRoutes = require("./payment.routes");
const orderRoutes = require("./order.routes");
const ratingRoutes = require("./rating.routes");

const router = express.Router();

router.use("/user", userRoutes);
router.use("/", authRoutes);
router.use("/product", productRoutes);
router.use("/payment", paymentRoutes);
router.use("/cart", cartRoutes);
router.use("/order", orderRoutes);
router.use("/rating", ratingRoutes);

module.exports = router;
