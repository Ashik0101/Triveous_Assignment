const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");

const authMiddleware = require("../middlewares/authMiddleware");

//Route to create order
orderRouter.post("/", authMiddleware, orderController.placeOrder);

//Route to get order history
orderRouter.get(
  "/order-history",
  authMiddleware,
  orderController.getOrderHistory
);

//Route to get order details by id
orderRouter.get("/:orderId", authMiddleware, orderController.getOrderDetails);

module.exports = orderRouter;
