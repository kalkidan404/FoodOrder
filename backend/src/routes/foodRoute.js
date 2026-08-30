
const express = require("express");

const route = express.Router();

const {
  getFoods,
  getFood,
  getRestaurantFoods
} = require("../controller/foodController");

route.get("/", getFoods);

route.get("/restaurant/:id", getRestaurantFoods);

route.get("/:id", getFood);

module.exports = route;
