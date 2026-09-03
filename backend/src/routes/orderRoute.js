
const express = require("express");

const route = express.Router();

const {
  createOrder,
  getMyOrders,
  getOrder,
  cancelOrder
} = require("../controller/orderController");

const authMiddleware = require("../middleware/auth");

route.post("/", authMiddleware, createOrder);

route.get("/", authMiddleware, getMyOrders);

route.get("/:id", authMiddleware, getOrder);

route.delete("/:id", authMiddleware, cancelOrder);

module.exports = route;
