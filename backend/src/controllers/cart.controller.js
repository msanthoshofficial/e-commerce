const { cartModel } = require("../models/cart.model");
const { Product } = require("../models/product.models");

exports.getCartItemCount = async (req, res) => {
	try {
		const userId = req.id;
		// Find the user's cart
		const userCart = await cartModel.findOne({ user_id: userId });

		if (!userCart) {
			return res
				.status(404)
				.json({ message: "User does not have a cart" });
		}

		// Calculate the total count of items in the cart
		const itemCount = userCart.products.reduce(
			(total, product) => total + product.quantity,
			0
		);

		return res.status(200).json({ itemCount });
	} catch (err) {
		return res.status(500).json({ message: "Can't get cart item count" });
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
		const productId = req.params.productId;

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

exports.getCartItemsWithDetails = async (req, res) => {
	try {
		const userId = req.id; // Assuming userId is passed as a parameter

		// Find the user's cart
		const userCart = await cartModel.findOne({ user_id: userId });

		if (!userCart) {
			return res
				.status(404)
				.json({ message: "User does not have a cart" });
		}

		// Retrieve product details for each item in the cart
		const cartItemsWithDetails = await Promise.all(
			userCart.products.map(async (cartItem) => {
				const productDetails = await Product.findById(
					cartItem.product_id
				);
				return {
					product_id: cartItem.product_id,
					quantity: cartItem.quantity,
					productDetails,
				};
			})
		);

		return res.status(200).json({ cartItems: cartItemsWithDetails });
	} catch (err) {
		return res
			.status(500)
			.json({ message: "Can't get cart items with details" });
	}
};

exports.reduceCartItemQuantity = async (req, res) => {
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

		// Find the index of the product in the cart
		const productIndex = userCart.products.findIndex(
			(product) => product.product_id.toString() === productId
		);

		if (productIndex === -1) {
			return res
				.status(404)
				.json({ message: "Product not found in the cart" });
		}

		// Reduce the quantity of the product (assuming quantity cannot be negative)
		if (userCart.products[productIndex].quantity > 1) {
			userCart.products[productIndex].quantity -= 1;
		} else {
			// If the quantity is 1
			return res
				.status(500)
				.json({ message: "Can't reduce cart item quantity" });
		}

		// Save the updated cart
		await userCart.save();

		return res
			.status(200)
			.json({ message: "Cart item quantity reduced successfully" });
	} catch (err) {
		return res
			.status(500)
			.json({ message: "Can't reduce cart item quantity" });
	}
};

exports.deleteCart = async (userId) => {
	try {
		// Find and delete the user's cart
		const result = await cartModel.deleteOne({ user_id: userId });
		if (result.deletedCount === 1) {
			return true;
		}
		return false;
	} catch (err) {
		console.log(err);

		return false;
	}
};
