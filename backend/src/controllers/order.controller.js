const Order = require("../models/order.model");
const { Product } = require("../models/product.models");

exports.getMyOrderCount = async (req, res) => {
	try {
		const user_id = req.id;
		const count = await Order.countDocuments({ user_id: user_id });
		return res.status(201).json(count);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};

exports.getMyOrders = async (req, res) => {
	try {
		const user_id = req.id;
		const orders = await Order.find({ user_id: user_id }).populate({
			path: "product.product_id",
			model: Product,
		});
		return res.status(201).json(orders);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};

exports.getSellerOrders = async (req, res) => {
	try {
		const seller_id = req.id;
		const orders = await Order.find({ seller_id: seller_id }).populate({
			path: "product.product_id",
			model: Product,
		});
		return res.status(201).json(orders);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};

exports.updateOrderStatus = async (req, res) => {
	try {
		const order_id = req.params.id;
		const { status } = req.body;
		const order = await Order.findOneAndUpdate(
			{ _id: order_id },
			{ status: status }
		);
		return res.status(201).json(order);
	} catch (err) {
		console.log(err);
		return res.status(500).send(err);
	}
};
