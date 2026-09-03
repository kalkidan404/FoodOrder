
const prisma = require("../config/prisma");


  const addToCart = async (req, res, next) => {
  try {
    const { foodId, quantity } = req.body;

    const userId = req.user.id;
    const foodIdNumber = Number(foodId);

    const food = await prisma.Food.findUnique({
      where: {
        id: foodIdNumber
      }
    });

    if (!food) {
      return res.status(404).json({
        message: "Food not found"
      });
    }

    const existingItem = await prisma.CartItem.findUnique({
      where: {
        userId_foodId: {
          userId: userId,
          foodId: foodIdNumber
        }
      }
    });

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

    const item = await prisma.CartItem.create({
      data: {
        userId: userId,
        foodId: foodIdNumber,
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