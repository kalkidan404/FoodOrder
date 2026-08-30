
const express = require("express");

const route = express.Router();

const {
  getRestaurants,
  getRestaurant,
  getRestaurantFoods
} = require("../controller/RestaurantController");


route.get("/", getRestaurants);

route.get("/:id", getRestaurant);

route.get("/:id/foods", getRestaurantFoods);


module.exports = route;
