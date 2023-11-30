const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

// PORT
const app = express();
const PORT = process.env.port || 5100;

// Config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());
app.use(morgan("combined"));

// router
const product = require("./router/product.js");
const cart = require("./router/cart.js");
const shop = require("./router/shop.js");
const user = require("./router/user.js");

// Address
app.use("/product", product);
app.use("/cart", cart);
app.use("/shop", shop);
app.use("/user", user);

try {
	app.listen(PORT, () => {
		console.log(`Server is running on ${PORT}`);
	});
} catch {
	(err) => {
		console.log("err", err);
	};
}
