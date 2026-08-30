
const prisma = require("../config/prisma");
const axios = require("axios");

// INITIALIZE PAYMENT

const initializePayment = async (req, res, next) => {
  try {
    // 1. Get the logged-in user's ID
    const userId = req.user.id;

    // 2. Get the order ID from the URL
    const orderId = Number(req.params.id);

    // 3. Find the order
    const order = await prisma.Order.findUnique({
      where: {
        id: orderId
      }
    });

    // 4. Make sure the order exists
    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    // 5. Make sure this order belongs to the logged-in user
    if (order.userId !== userId) {
      return res.status(403).json({
        message: "You cannot access this order"
      });
    }

    // 6. Only pending orders can be paid
    if (order.status !== "pending") {
      return res.status(400).json({
        message: "This order is not available for payment"
      });
    }

    // 7. Get the amount from OUR database
    const total = order.total;

    // 8. Check if this order already has a payment
    const existingPayment = await prisma.Payment.findUnique({
      where: {
        orderId: orderId
      }
    });

    if (existingPayment) {
      return res.status(400).json({
        message: "Payment already initialized for this order",
        checkoutUrl: existingPayment.checkoutUrl
      });
    }

    // 9. Create a unique transaction reference
    const transactionRef =
      `food-order-${orderId}-${Date.now()}`;

    // 10. Create the payment record in our database
    const payment = await prisma.Payment.create({
      data: {
        orderId: orderId,
        amount: total,
        currency: "ETB",
        transactionRef: transactionRef
      }
    });

    // 11. Ask Chapa to initialize the payment
    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        amount: total,
        currency: "ETB",
        email: req.user.email,
        first_name: req.user.name || "Customer",
        tx_ref: transactionRef,

        // Change this to your real frontend/backend URLs
        callback_url:
          `${process.env.BACKEND_URL}/payment/callback/${transactionRef}`,

        return_url:
          `${process.env.FRONTEND_URL}/payment/success`
      },
      {
        headers: {
          Authorization:
            `Bearer ${process.env.CHAPA_SECRET_KEY}`,

          "Content-Type": "application/json"
        }
      }
    );

    // 12. Get the checkout URL from Chapa
    const checkoutUrl =
      response.data.data.checkout_url;

    
    // 13. Send checkout URL to frontend
    return res.status(201).json({
      message: "Payment initialized successfully",
      checkoutUrl: checkoutUrl
    });

  } catch (error) {
    next(error);
  }
};


// ======================================================
// VERIFY PAYMENT
// ======================================================

const verifyPayment = async (req, res, next) => {
  try {
    // 1. Get transaction reference
    const transactionRef = req.params.tx_ref;

    // 2. Find our payment
    const payment = await prisma.Payment.findUnique({
      where: {
        transactionRef: transactionRef
      },
      include: {
        order: true
      }
    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found"
      });
    }

    // 3. Ask Chapa for the real transaction status
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${transactionRef}`,
      {
        headers: {
          Authorization:
            `Bearer ${process.env.CHAPA_SECRET_KEY}`
        }
      }
    );

    const transaction = response.data.data;

    // 4. Verify the important transaction details
    if (
      transaction.status !== "success" ||
      transaction.tx_ref !== payment.transactionRef ||
      Number(transaction.amount) !== payment.amount ||
      transaction.currency !== payment.currency
    ) {
      return res.status(400).json({
        message: "Payment verification failed"
      });
    }

    // 5. Update our payment
    const updatedPayment = await prisma.Payment.update({
      where: {
        id: payment.id
      },
      data: {
        status: "success",
        providerRef: transaction.reference
      }
    });

    // 6. Update our order
    const updatedOrder = await prisma.Order.update({
      where: {
        id: payment.orderId
      },
      data: {
        status: "paid"
      }
    });

    // 7. Tell frontend payment succeeded
    return res.status(200).json({
      message: "Payment verified successfully",
      payment: updatedPayment,
      order: updatedOrder
    });

  } catch (error) {
    next(error);
  }
};


// ======================================================
// CHAPA CALLBACK
// ======================================================

const paymentCallback = async (req, res, next) => {
  try {
    const transactionRef = req.params.tx_ref;

    // We don't trust the callback by itself.
    // We send the transaction reference to our
    // verification function instead.

    const payment = await prisma.Payment.findUnique({
      where: {
        transactionRef: transactionRef
      }
    });

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found"
      });
    }

    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${transactionRef}`,
      {
        headers: {
          Authorization:
            `Bearer ${process.env.CHAPA_SECRET_KEY}`
        }
      }
    );

    const transaction = response.data.data;

    if (
      transaction.status !== "success" ||
      transaction.tx_ref !== payment.transactionRef ||
      Number(transaction.amount) !== payment.amount ||
      transaction.currency !== payment.currency
    ) {
      return res.status(400).json({
        message: "Payment was not successful"
      });
    }

    await prisma.Payment.update({
      where: {
        id: payment.id
      },
      data: {
        status: "success",
        providerRef: transaction.reference
      }
    });

    await prisma.Order.update({
      where: {
        id: payment.orderId
      },
      data: {
        status: "paid"
      }
    });

    return res.status(200).json({
      message: "Payment successful"
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  initializePayment,
  verifyPayment,
  paymentCallback
};
