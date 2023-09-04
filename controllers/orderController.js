const Order = require("../models/Order");
const Cart = require("../models/Cart");

const placeOrder = async (req, res) => {
  try {
    const user_id = req.user_id;

    // Find the user's cart
    const cart = await Cart.findOne({ user: user_id }).populate(
      "items.product"
    );

    if (!cart || !cart.items.length) {
      return res.status(404).json({
        message: "Cart not found. Please add items to your cart first.",
      });
    }

    // Calculate the total order amount based on the items in the cart
    let totalAmount = 0;
    for (const item of cart.items) {
      totalAmount += item.product.price * item.quantity;
    }

    // Create a new order
    const order = new Order({
      user: user_id,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      totalAmount: totalAmount,
    });

    // Save the order
    await order.save();

    // Clear the user's cart after placing the order
    await Cart.findOneAndRemove({ user: user_id });

    res.json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      message: "An error occurred while placing the order",
      error: error.message,
    });
  }
};

//Get Order history of a user
const getOrderHistory = async (req, res) => {
  try {
    const user_id = req.user_id;

    // Find all orders for the authenticated user
    const orders = await Order.find({ user: user_id }).populate(
      "items.product"
    );

    res.json({ orders });
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).json({
      message: "An error occurred while fetching order history",
      error: error.message,
    });
  }
};

//Get Order Details by id
const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const user_id = req.user_id;

    // Find the order by its ID
    const order = await Order.findById(orderId).populate("items.product");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the user_id in the request body matches the user_id associated with the order
    if (order.user.toString() !== user_id) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to order details" });
    }

    res.json({ order });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({
      message: "An error occurred while fetching order details",
      error: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getOrderHistory,
  getOrderDetails,
};
