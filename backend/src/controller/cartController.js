
const prisma = require("../config/prisma");

const addToCart = async (req, res, next) => {
  try {
    const foodId = Number(req.params.foodId);
    const { quantity } = req.body;
    const userId = req.user.id;

    // Check that the food exists
    const food = await prisma.Food.findUnique({
      where: {
        id: foodId
      }
    });

    if (!food) {
      return res.status(404).json({
        message: "Food not found"
      });
    }

    // Check if this food is already in this user's cart
    const existingItem = await prisma.CartItem.findUnique({
      where: {
        userId_foodId: {
          userId: userId,
          foodId: foodId
        }
      }
    });

    // If it already exists, increase the quantity
    if (existingItem) {
      const updatedItem = await prisma.CartItem.update({
        where: {
          id: existingItem.id
        },
        data: {
          quantity: existingItem.quantity + quantity
        }
      });

      return res.status(200).json({
        message: "Cart updated",
        item: updatedItem
      });
    }

    // If it doesn't exist, create a new cart item
    const item = await prisma.CartItem.create({
      data: {
        userId: userId,
        foodId: foodId,
        quantity: quantity
      }
    });

    return res.status(201).json({
      message: "Food added to cart",
      item: item
    });

  } catch (error) {
    next(error);
  }
};
const getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const cart = await prisma.CartItem.findMany({
      where: {
        userId: userId
      },
      include: {
        food: true
      }
    });

    return res.status(200).json({
      cart
    });

  } catch (error) {
    next(error);
  }
};

const removeItem = async (req, res, next) => {
  try {
    const cartId = Number(req.params.cartId);

    const item = await prisma.CartItem.findUnique({
      where: {
        id: cartId
      }
    });

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found"
      });
    }

    await prisma.CartItem.delete({
      where: {
        id: cartId
      }
    });

    return res.status(200).json({
      message: "Item removed from cart"
    });

  } catch (error) {
    next(error);
  }
};



module.exports = {
  addToCart,
  getCart,
  removeItem
};