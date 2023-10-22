const { Order } = require("../models/order.model");
const { Product } = require("../models/product.models");

// Function to update the average rating for a product
const updateProductRating = async (productId) => {
	try {
		const productRatings = await ratingModel.find({
			product_id: productId,
		});

		const totalRatings = productRatings.reduce(
			(sum, rating) => sum + rating.rating,
			0
		);
		const averageRating = totalRatings / productRatings.length;
		// Update the average rating in the product document
		await Product.findByIdAndUpdate(productId, {
			rating: averageRating,
		});
		return true;
	} catch (error) {
		return false;
	}
};

// Get rating by user id and product id
exports.getMyRating = async (req, res) => {
	const userId = req.id;
	const { productId } = req.params;

	try {
		const rating = await Order.findOne({
			user_id: userId,
			"product.product_id": productId,
		});

		if (!rating) {
			return res.status(404).json({ message: "Rating not found" });
		}

		res.status(200).json({ rating });
	} catch (error) {
		console.error("Error getting rating:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// Update rating by user id and product id
exports.updateMyRating = async (req, res) => {
	const userId = req.id;
	const { productId } = req.params;
	const { rating: newRating } = req.body;
	try {
		// Assuming you have validation for the rating value
		if (newRating < 0 || newRating > 5) {
			return res.status(400).json({ message: "Invalid rating value" });
		}

		const updatedRating = await Order.findOneAndUpdate(
			{ user_id: userId, "product.product_id": productId },
			{ rating: newRating },
			{ new: true }
		);

		if (!updatedRating) {
			return res.status(404).json({ message: "Order not found" });
		}
		await updateProductRating(productId);

		res.status(200).json({ updatedRating });
	} catch (error) {
		console.error("Error updating rating:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
