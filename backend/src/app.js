const express = require("express");
const cors = require("cors");
const session = require("express-session");
//require("dotenv").config({ path: ".env.prod" });
const connectDB = require("./config/db");
const routes = require("./routes/app.routes");
const paymentController = require("./controllers/payment.controller");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const { rateLimit } = require("express-rate-limit");

process.env.PORT
	? console.log("prod mode")
	: require("dotenv").config({ path: ".env.prod" });

var app = express();
app.use(compression());

app.use(
	cors({
		origin: [
			"http://localhost:4200",
			"https://e-commerce-app-silk.vercel.app",
			"https://e-commerce-app-git-main-santhoshs-projects-0d2a08dd.vercel.app/",
		],
		credentials: true,
	})
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

const apiLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes)
	standardHeaders: "draft-7", // Set `RateLimit` and `RateLimit-Policy` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

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
	app.use("/api", apiLimiter);
	app.get("/", (req, res) => {
		res.send("Welcome to E-Commerce Backend");
	});
	app.listen(PORT, () => {
		console.log(`🚀Server is running on port ${PORT}`);
	});
});
