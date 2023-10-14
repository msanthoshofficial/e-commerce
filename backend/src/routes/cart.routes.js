const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");
const { jwt_verify } = require("../middlewares/auth");

// Get user's cart count
router.get("/count", jwt_verify, cartController.getCartItemCount);

// Get user's cart
router.get("/", jwt_verify, cartController.getCartItemsWithDetails);

// Add to cart
router.post("/", jwt_verify, cartController.addToCart);

// Reduce Quantity
router.post("/reduce", jwt_verify, cartController.reduceCartItemQuantity);

// Remove from cart
router.delete("/:productId", jwt_verify, cartController.removeFromCart);

module.exports = router;
