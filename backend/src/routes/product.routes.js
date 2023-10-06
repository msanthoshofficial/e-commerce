// routes/product.routes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const auth = require("../middlewares/auth");

// Route to get all products
router.get("/", auth.jwt_verify, productController.getAllProducts);

// Route to get a single product by ID
router.get("/:id", auth.jwt_verify, productController.getProductById);

// Route to create a new product
router.post("/", auth.jwt_verify, productController.createProduct);

// Route to update a product by ID
router.put("/:id", auth.jwt_verify, productController.updateProduct);

// Route to delete a product by ID
router.delete("/:id", productController.deleteProduct);

module.exports = router;
