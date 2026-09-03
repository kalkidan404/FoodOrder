
const prisma = require("../config/prisma");


// GET ALL RESTAURANTS

const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await prisma.Restaurant.findMany();

    return res.status(200).json({
      restaurants
    });

  } catch (error) {
    next(error);
  }
};


// GET ONE RESTAURANT

const getRestaurant = async (req, res, next) => {
  try {
    const restaurantId = Number(req.params.id);

    const restaurant = await prisma.Restaurant.findUnique({
      where: {
        id: restaurantId
      },include:{
        food:true,
      }
    });

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    return res.status(200).json({
      restaurant
    });

  } catch (error) {
    next(error);
  }
};


// GET FOODS FROM ONE RESTAURANT

const getRestaurantFoods = async (req, res, next) => {
  try {
    const restaurantId = Number(req.params.id);

    const restaurant = await prisma.Restaurant.findUnique({
      where: {
        id: restaurantId
      },
      include: {
        foods: true
      }
    });

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    return res.status(200).json({
      restaurant: restaurant.name,
      foods: restaurant.foods
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  getRestaurants,
  getRestaurant,
  getRestaurantFoods
};
