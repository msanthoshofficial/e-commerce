const Order = require("../models/order.model");
const { deleteCart } = require("./cart.controller");
const stripe = require("stripe")(process.env.stripe_secret);

exports.webhook = async (req, res) => {
	const endpointSecret = process.env.endpoint_secret;
	const sig = req.headers["stripe-signature"];

	let event;

	try {
		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
	} catch (err) {
		console.error(`Webhook Error: ${err.message}`);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}
	switch (event.type) {
		case "charge.succeeded":
			const paymentIntent = event.data.object;

			// Update the order in MongoDB with payment status
			const orderId = paymentIntent.metadata.payment_id;
			await Order.findOneAndUpdate(
				{ _id: orderId },
				{ $set: { payment_status: "succeeded" } }
			);
			// Handle the payment success event
			break;
	}

	// Return a response to acknowledge receipt of the event
	res.json({ received: true });
};

exports.createPaymentIntent = async (req, res) => {
	try {
		const { amount, products } = req.body;
		const user_id = req.id;

		// Create a new order without specifying payment_id, MongoDB will generate _id
		const order = new Order({ user_id, amount, products });
		await order.save();

		const paymentIntent = await stripe.paymentIntents.create({
			amount: parseInt(amount * 100),
			currency: "inr",
			payment_method_types: ["card"],
			metadata: {
				payment_id: order._id.toString(), // Convert ObjectId to string
			},
		});

		// Update the order with the generated payment_id
		order.payment_id = paymentIntent.metadata.payment_id;
		await order.save();
		const deleted = await deleteCart(req, res);

		return res
			.status(201)
			.json({ pi: paymentIntent, cart_deleted: deleted });
	} catch (err) {
		console.log(err);
		return res.status(500).json(err.message);
	}
};
