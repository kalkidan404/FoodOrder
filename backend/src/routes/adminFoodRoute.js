
const express = require("express");

const route = express.Router();

const {                                                               
    insertFood,
    deleteFood,
    updateFood,
    getFoods
} = require("../controller/adminFoodController");

const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/adminMiddleware");

route.post("/", authMiddleware, adminMiddleware, insertFood);

route.delete("/:id", authMiddleware, adminMiddleware, deleteFood);

route.put("/:id", authMiddleware, adminMiddleware, updateFood);

route.get("/", authMiddleware, adminMiddleware, getFoods);

module.exports = route;
