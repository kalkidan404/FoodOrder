
const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

// User routes
const authRoute = require("./routes/authRoute");
const cartRoute = require("./routes/cartRoute");
const foodRoute = require("./routes/foodRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/PaymentRoute");
const restaurantRoute = require("./routes/restaurantRoute");

// Admin routes
const adminFoodRoute = require("./routes/adminFoodRoute");
const adminOrderRoute = require("./routes/adminOrderRoute");
const adminRestaurantRoute = require("./routes/adminRestaurantRoute");

// Error handling
const errorHandler = require("./middleware/errorHandling");

// User routes
app.use("/auth", authRoute);
app.use("/cart", cartRoute);
app.use("/foods", foodRoute);
app.use("/orders", orderRoute);
app.use("/payment", paymentRoute);
app.use("/restaurants", restaurantRoute);

// Admin routes
app.use("/admin/foods", adminFoodRoute);
app.use("/admin/orders", adminOrderRoute);
app.use("/admin/restaurants", adminRestaurantRoute);

app.get("/", (req, res) => {
    res.json({
        message: "started well"
    });
});

app.use(errorHandler);

module.exports = app;
