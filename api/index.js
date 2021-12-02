const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const mercadopago = require('mercadopago')
const cors = require('cors');
const User = require("./models/User");
const Order = require("./models/Order");



mercadopago.configure({
  access_token: "TEST-5782216778404707-110515-18d603dab8b4a8af4a70f26ed54b10ce-215113511"
})

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors())
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/order", orderRoute);


const checkoutSave = async (items, preferenceId) => {
	const amount = Object.values(items).reduce((accumulator, { unit_price, quantity }) => {
		return accumulator + ( unit_price * quantity );
	}, 0)

	const saveOrder = new Order({
        amount: amount,
        payment_id: null,
        preference_id: preferenceId,
        items: items
    });

	try{
        const newOrder = await saveOrder.save();
    } catch(err) {
		console.log(err)
    }
}

app.post("/checkout", async (req, res) => {
	const items = req.body.items || {}

	const preference = {
		items,
		back_urls: {
			"success": "http://localhost:5000/mp/success",
			"failure": "http://localhost:5000/mp/failure",
			"pending": "http://localhost:5000/mp/pending"
		},
		auto_return: "approved",
	};

	const response = await mercadopago.preferences.create(preference)
		.catch(function (error) {
			console.log(error);
		});


	await checkoutSave(items, response.body.id)

	res.json({
		id: response.body.id
	});
});

app.get("/mp/success", async (req, res) => {
	console.log(req.query)


	res.redirect('http://localhost:3000/ordenRealizada');

	res.json(req.query);
})

app.get('/feedback', function(req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});







app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
  });