const express=require("express");
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());
const authRoute=require("./routes/authRoute");
const cartRoute=require("./routes/cartRoute");
const foodRoute=require("./routes/foodRoute");
const orderRoute=require("./routes/orderRoute")
const paymentRoute=require("./routes/PaymentRoute");
const restaurantRoute=require("./routes/restaurantRoute");
const userRoute=require("./routes/UserRoute");
const errorHandler=require("./middleware/errorHandling");
app.use("/auth", authRoute);
app.use("/cart", cartRoute);
app.use("/foods", foodRoute);
app.use("/orders", orderRoute);
app.use("/payment", paymentRoute);
app.use("/restaurans", restaurantRoute);
app.use("/user", userRoute)
app.use(errorHandler);
app.get("/",(req,res)=>{
    res.json({
        message:"started well"
    })
})
module.exports=app;