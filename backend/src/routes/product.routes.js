// routes/product.routes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { jwt_verify, isSellerOrAdmin } = require("../middlewares/auth");

// Route to get all products
router.get("/", jwt_verify, productController.getAllProducts);

// Route to get my products
router.get(
	"/my-products",
	jwt_verify,
	isSellerOrAdmin,
	productController.getMyProducts
);

// Route to get a single product by ID
router.get("/:id", jwt_verify, productController.getProductById);

// Route to create a new product
router.post("/", jwt_verify, isSellerOrAdmin, productController.createProduct);

// Route to update a product by ID
router.put(
	"/:id",
	jwt_verify,
	isSellerOrAdmin,
	productController.updateProduct
);

// Route to delete a product by ID
router.delete(
	"/:id",
	jwt_verify,
	isSellerOrAdmin,
	productController.deleteProduct
);

module.exports = router;
