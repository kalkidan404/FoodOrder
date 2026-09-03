const express = require("express");

const route = express.Router();

const {
  addToCart,
  getCart,
  removeItem
} = require("../controller/cartController");

const authMiddleware = require("../middleware/auth");

route.get("/", authMiddleware, getCart);

route.post("/", authMiddleware, addToCart);

route.delete("/:cartId", authMiddleware, removeItem);

module.exports = route;