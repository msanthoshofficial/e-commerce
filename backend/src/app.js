const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const connectDB = require("./config/db");
const routes = require("./routes/app.routes");
const paymentController = require("./controllers/payment.controller");
const compression = require("compression");
const cookieParser = require("cookie-parser");

var app = express();
app.use(compression());

app.use(cors({ origin: "http://localhost:4200", credentials: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(
	session({
		secret: process.env.session_secret,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true },
	})
);

const PORT = process.env.PORT || 3000;
connectDB().then(() => {
	app.post(
		"/webhook",
		express.raw({ type: "application/json" }),
		paymentController.webhook
	);
	app.use(express.json());
	app.use("/api", routes);
	app.get("/", (req, res) => {
		res.send("Welcome to E-Commerce Backend");
	});
	app.listen(PORT, () => {
		console.log(`🚀Server is running on port ${PORT}`);
	});
});
