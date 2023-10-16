const Order = require("../models/order.model");
const stripe = require("stripe")(
	"sk_test_51O1liaSENN4SVfayeKNH0hRXtLkd3ltyxe3Dmq6V0n2iemmNxydDkvGGSy7NRx3MVjsFGH4IzKWAjo4VQ2Kuv14J005nn163gi"
);

exports.webhook = async (req, res) => {
	const endpointSecret =
		"whsec_c32c7099db3d273202548d5e999a9123d49ac2a88d523fac473a7373734fa5b3";
	const sig = req.headers["stripe-signature"];

	let event;

	try {
		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
	} catch (err) {
		console.error(`Webhook Error: ${err.message}`);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}
	console.log(event);
	// Handle the event
	switch (event.type) {
		case "payment_intent.succeeded":
			const paymentIntent = event.data.object;
			// Handle the payment success event
			break;
		// Handle other event types if needed
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	// Return a response to acknowledge receipt of the event
	res.json({ received: true });
};

exports.createPaymentIntent = async (req, res) => {
	const { amount, product, payment_id } = req.body;
	const user_id = req.id;
	const paymentIntent = await stripe.paymentIntents.create({
		amount,
		currency: "inr",
		payment_method_types: ["card"],
	});

	async (err, paymentIntent) => {
		if (err) {
			return res.status(500).json(err.message);
		} else {
			// Save the purchase to MongoDB
			const order = new Order({ user_id, payment_id, amount, product });
			await order.save();

			return res.status(201).json(paymentIntent);
		}
	};
	return res.json(paymentIntent);
};
