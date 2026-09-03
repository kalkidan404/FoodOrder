const express = require("express");

const route = express.Router();

const {
  initializePayment,
  verifyPayment,
  paymentCallback
} = require("../controller/paymentController");

const authMiddleware = require("../middleware/auth");

route.post("/:id", authMiddleware, initializePayment);

route.get(
  "/verify/:tx_ref",
  authMiddleware,
  verifyPayment
);

route.get(
  "/callback/:tx_ref",
  paymentCallback
);

module.exports = route;