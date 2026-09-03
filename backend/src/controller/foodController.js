
const prisma = require("../config/prisma");

const getFoods = async (req, res, next) => {
  try {
    const foods = await prisma.Food.findMany();

    return res.status(200).json({
      message: "Successfully shown",
      foods
    });

  } catch (error) {
    next(error);
  }
};

const getFood = async (req, res, next) => {
  try {
    const foodId = Number(req.params.id);

    const food = await prisma.Food.findUnique({
      where: {
        id: foodId
      }, include:{
        restaurant:true
      }
    });

    if (!food) {
      return res.status(404).json({
        message: "Food not found"
      });
    }

    return res.status(200).json({
      message: "Food shown successfully",
      food
    });

  } catch (error) {
    next(error);
  }
};
const getRestaurantFoods = async (req, res, next) => {
  try {
    const restaurantId = Number(req.params.id);

    const restaurant = await prisma.Restaurant.findUnique({
      where: {
        id: restaurantId
      }
    });

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found"
      });
    }

    const foods = await prisma.Food.findMany({
      where: {
        restaurantId: restaurantId
      }
    });

    return res.status(200).json({
      foods
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFoods,
  getFood,
  getRestaurantFoods
};