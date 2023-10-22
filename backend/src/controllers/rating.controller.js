const { Product } = require("../models/product.models");
const { ratingModel } = require("../models/rating.model");

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
		const rating = await ratingModel.findOne({
			user_id: userId,
			product_id: productId,
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

		const updatedRating = await ratingModel.findOneAndUpdate(
			{ user_id: userId, product_id: productId },
			{ rating: newRating },
			{ new: true }
		);

		if (!updatedRating) {
			return res.status(404).json({ message: "Rating not found" });
		}
		await updateProductRating(productId);

		res.status(200).json({ updatedRating });
	} catch (error) {
		console.error("Error updating rating:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// Add rating by user id and product id
exports.addMyRating = async (req, res) => {
	const userId = req.id;
	const { productId } = req.params;
	const { rating: newRating } = req.body;

	try {
		if (isNaN(newRating) || newRating < 0 || newRating > 5) {
			return res.status(400).json({ message: "Invalid rating value" });
		}

		const existingRating = await ratingModel.findOne({
			user_id: userId,
			product_id: productId,
		});

		if (existingRating) {
			return res.status(400).json({ message: "Rating already exists" });
		}

		const createdRating = await ratingModel.create({
			user_id: userId,
			product_id: productId,
			rating: newRating,
		});

		await updateProductRating(productId);

		res.status(201).json({ createdRating });
	} catch (error) {
		console.error("Error adding rating:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// Delete rating by user id and product id
exports.deleteMyRating = async (req, res) => {
	const userId = req.id;
	const { productId } = req.params;

	try {
		const deletedRating = await ratingModel.findOneAndDelete({
			user_id: userId,
			product_id: productId,
		});

		if (!deletedRating) {
			return res.status(404).json({ message: "Rating not found" });
		}

		await updateProductRating(productId);
		res.status(200).json({ message: "Rating deleted successfully" });
	} catch (error) {
		console.error("Error deleting rating:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};
