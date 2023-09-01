// routes/cartRoutes.js
const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controllers/cartController");
const { body, param } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

// Add product to cart route
cartRouter.post(
  "/add",
  [
    body("product")
      .notEmpty()
      .withMessage("Product ID is required.")
      .isMongoId()
      .withMessage("Invalid product ID"),
  ],
  authMiddleware,
  cartController.addToCart
);

//Route for viewing cart details
cartRouter.get("/view", authMiddleware, cartController.viewCart);

//Route for decrementing quantity
cartRouter.patch(
  "/decrement/:productId",
  [
    param("productId")
      .notEmpty()
      .withMessage("Product ID is required.")
      .isMongoId()
      .withMessage("Invalid product ID"),
  ],
  authMiddleware,
  cartController.decrementQuantity
);

//Route for removing product from cart
cartRouter.patch(
  "/remove/:productId",
  [
    param("productId")
      .notEmpty()
      .withMessage("Product ID is required.")
      .isMongoId()
      .withMessage("Invalid product ID"),
  ],
  authMiddleware,
  cartController.removeProductFromCart
);

module.exports = cartRouter;
