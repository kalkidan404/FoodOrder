
const prisma = require("../config/prisma");

const createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Get all items in the user's cart
    const cartItems = await prisma.CartItem.findMany({
      where: {
        userId: userId
      },
      include: {
        food: true
      }
    });

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    // Calculate the total
    let total = 0;

    for (const item of cartItems) {
      total += item.food.price * item.quantity;
    }

    // Save the cart items as a string in the order
    const orderItems = cartItems.map((item) => ({
      foodId: item.foodId,
      name: item.food.name,
      price: item.food.price,
      quantity: item.quantity
    }));

    const order = await prisma.Order.create({
      data: {
        userId: userId,
        items: JSON.stringify(orderItems),
        total: total
      }
    });

    // Clear the cart after creating the order
    await prisma.CartItem.deleteMany({
      where: {
        userId: userId
      }
    });

    return res.status(201).json({
      message: "Order created successfully",
      order
    });

  } catch (error) {
    next(error);
  }
};


const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orders = await prisma.Order.findMany({
      where: {
        userId: userId
      }
    });

    if (orders.length === 0) {
      return res.status(404).json({
        message: "No orders found"
      });
    }

    return res.status(200).json({
      message: "Orders found",
      orders
    });

  } catch (error) {
    next(error);
  }
};


const getOrder = async (req, res, next) => {
  try {
    const orderId = Number(req.params.id);
    const userId = req.user.id;

    const order = await prisma.Order.findUnique({
      where: {
        id: orderId
      }
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    // Make sure this order belongs to the logged-in user
    if (order.userId !== userId) {
      return res.status(403).json({
        message: "You cannot access this order"
      });
    }

    return res.status(200).json({
      message: "Order found",
      order
    });

  } catch (error) {
    next(error);
  }
};


const cancelOrder = async (req, res, next) => {
  try {
    const orderId = Number(req.params.id);
    const userId = req.user.id;

    const order = await prisma.Order.findUnique({
      where: {
        id: orderId
      }
    });

    if (!order) {
      return res.status(200).json({
        message: "Order not found"
      });
    }

    if (order.userId !== userId) {
      return res.status(403).json({
        message: "You cannot cancel this order"
      });
    }

    if (order.status !== "pending") {
      return res.status(400).json({
        message: "This order cannot be cancelled"
      });
    }

    const cancelledOrder = await prisma.Order.update({
      where: {
        id: orderId
      },
      data: {
        status: "cancelled"
      }
    });

    return res.status(200).json({
      message: "Order cancelled successfully",
      order: cancelledOrder
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  createOrder,
  getMyOrders,
  getOrder,
  cancelOrder
};
