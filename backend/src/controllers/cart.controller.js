const { cartModel } = require("../models/cart.model");

exports.getCartByUserId = async (req, res) => {
	try {
		const userId = req.id;
		const userCart = await cartModel.findOne({ user_id: userId });
		return res.status(200).json(userCart.products);
	} catch (err) {
		return res.status(500).json({ message: "Can't get cart" });
	}
};

exports.addToCart = async (req, res) => {
	try {
		const { productId, quantity } = req.body;
		const userId = req.id;
		// Check if the user has a cart
		let userCart = await cartModel.findOne({ user_id: userId });

		if (!userCart) {
			// If the user doesn't have a cart, create a new one
			userCart = new cartModel({ user_id: userId, products: [] });
		}

		// Check if the product is already in the cart
		const existingProductIndex = userCart.products.findIndex(
			(product) => product.product_id.toString() === productId
		);

		if (existingProductIndex !== -1) {
			// If the product is already in the cart, update the quantity
			userCart.products[existingProductIndex].quantity += quantity || 1;
		} else {
			// If the product is not in the cart, add it
			userCart.products.push({
				product_id: productId,
				quantity: quantity || 1,
			});
		}

		// Save the updated cart
		await userCart.save();

		return res
			.status(200)
			.json({ message: "Product added to cart successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Can't add product to cart" });
	}
};

exports.removeFromCart = async (req, res) => {
	try {
		const { productId } = req.body;

		const userId = req.id;
		// Find the user's cart
		const userCart = await cartModel.findOne({ user_id: userId });

		if (!userCart) {
			return res
				.status(404)
				.json({ message: "User does not have a cart" });
		}

		// Remove the product from the cart
		userCart.products = userCart.products.filter(
			(product) => product.product_id.toString() !== productId
		);

		// Save the updated cart
		await userCart.save();

		return res
			.status(200)
			.json({ message: "Product removed from cart successfully" });
	} catch (err) {
		return res
			.status(500)
			.json({ message: "Can't remove product from cart" });
	}
};
