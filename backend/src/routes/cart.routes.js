const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

// Get user's cart
router.get('/', cartController.getCartByUserId);

// Add to cart
router.post('/add', cartController.addToCart);

// Remove from cart
router.delete('/:productId', cartController.removeFromCart);

module.exports = router;
