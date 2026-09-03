const express = require("express");

const route = express.Router();

const {
  register,
  login,
  getMe,
  logout
} = require("../controller/authController");

const authMiddleware = require("../middleware/auth");

route.post("/login", login);

route.post("/register", register);

route.get("/me", authMiddleware, getMe);

route.post("/logout", authMiddleware, logout);

module.exports = route;