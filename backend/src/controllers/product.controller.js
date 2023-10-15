const { Product } = require("../models/product.models");
const multer = require("multer");

// Multer setup for image uploads
const storage = multer.memoryStorage();
const upload = multer({
	dest: "./images",
	storage: storage,
	limits: {
		fileSize: 1 * 1024 * 1024, // 1 MB limit
	},
	fileFilter: (req, file, cb) => {
		const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

		if (allowedTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(
				new Error(
					"Invalid file type. Only JPEG, PNG, and JPG are allowed."
				)
			);
		}
	},
}).single("image");

// Controller function to get all products
exports.getAllProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Controller function to get all products
exports.getMyProducts = async (req, res) => {
	try {
		const seller_id = req.id;
		const products = await Product.find({ seller_id: seller_id });
		res.json(products);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Controller function to get a single product by ID
exports.getProductById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		res.json(product);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Controller function to create a new product
exports.createProduct = async (req, res) => {
	try {
		upload(req, res, async function (err) {
			if (err) {
				console.error(err);
				return res.status(500).json({
					message:
						"Can't Create Product. Only JPG, JPEG, PNG files within 1mb are supported",
				});
			}

			var { name, description, price, quantity } = req.body;
			price = parseFloat(price);
			quantity = parseFloat(quantity);
			const rating = 0;
			const seller_id = req.id;
			const image = req.file ? req.file.buffer.toString("base64") : null;

			const content_type = req.file.mimetype;
			if (!image) {
				return res.status(500).json({
					message:
						"Can't Create Product. Only JPG, JPEG, PNG files within 1mb are supported",
				});
			}
			try {
				const product = await Product.create({
					name,
					description,
					price,
					rating,
					quantity,
					image,
					seller_id,
					content_type,
				});

				return res
					.status(201)
					.json({ message: "Product created successfully" });
			} catch (error) {
				return res
					.status(500)
					.json({ message: "Can't Create Product. No Image Found" });
			}
		});
	} catch (error) {
		return res.status(500).json({ message: "Can't Create Product" });
	}
};

// Controller function to update a product by ID
exports.updateProduct = async (req, res) => {
	try {
		const productId = req.params.id;

		upload(req, res, async function (err) {
			if (err) {
				console.error(err);
				return res
					.status(500)
					.json({ message: "Can't Update Product" });
			}

			try {
				const updatedProduct = await Product.findOneAndUpdate(
					{ _id: productId },
					{
						$set: {
							name: req.body.name,
							description: req.body.description,
							price: parseFloat(req.body.price),
							quantity: parseFloat(req.body.quantity),
							// Handle image update
							...(req.file && {
								image: req.file.buffer.toString("base64"),
							}),
							...(req.file && {
								content_type: req.file.mimetype,
							}),
						},
					},
					{ new: true } // Return the updated document
				);

				if (!updatedProduct) {
					return res
						.status(404)
						.json({ message: "Product not found" });
				}

				return res.status(200).json({
					message: "Product updated successfully",
					updatedProduct,
				});
			} catch (error) {
				console.error(error);
				return res
					.status(500)
					.json({ message: "Can't Update Product" });
			}
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Can't Update Product" });
	}
};

// Controller function to delete a product by ID
exports.deleteProduct = async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
