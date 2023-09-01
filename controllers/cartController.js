const { validationResult } = require("express-validator");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { decrementProductQuantity } = require("./productController");

// Function to add a product to the cart and also incrementing quantity of products in cart
const addToCart = async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user_id = req.user_id;
    let { product, quantity } = req.body;
    if (!quantity) quantity = 1;
    // Check if the user has an existing cart, or create a new one if not
    let cart = await Cart.findOne({ user: user_id });

    if (!cart) {
      cart = new Cart({
        user: user_id,
        items: [
          {
            product: product,
            quantity: quantity,
          },
        ],
      });
    } else {
      // Check if the product already exists in the cart
      const existingItem = cart.items.find(
        (item) => item.product.toString() === product
      );

      if (existingItem) {
        // If the product exists, update the quantity
        existingItem.quantity += quantity;
      } else {
        // If the product is not in the cart, add it
        cart.items.push({
          product: product,
          quantity: quantity,
        });
      }
    }

    await cart.save();

    res.json({ message: "Product added to the cart successfully", cart });
  } catch (error) {
    console.error("Error adding product to the cart:", error);
    res.status(500).json({
      message: "An error occurred while adding the product to the cart",
      error: error.message,
    });
  }
};

// View the cart
const viewCart = async (req, res) => {
  try {
    const user_id = req.user_id;

    // Find the user's cart based on their user_id
    const cart = await Cart.findOne({ user: user_id }).populate(
      "items.product"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    res.json({ message: "Cart details retrieved successfully", cart });
  } catch (error) {
    console.error("Error retrieving cart details:", error);
    res.status(500).json({
      message: "An error occurred while retrieving cart details",
      error: error.message,
    });
  }
};

// Function to decrement the quantity of a product in the cart
const decrementQuantity = async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.user_id;
    const productId = req.params.productId;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the cart item corresponding to the provided productId
    const cartItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    // Decrement the quantity
    if (cart.items[cartItemIndex].quantity > 0) {
      cart.items[cartItemIndex].quantity -= 1;
      // Remove the item from the cart if the quantity becomes 0
      if (cart.items[cartItemIndex].quantity === 0) {
        cart.items.splice(cartItemIndex, 1);
      }
    }

    await cart.save();

    res.json({ message: "Quantity decremented successfully", cart });
  } catch (error) {
    console.error("Error decrementing quantity:", error);
    res.status(500).json({
      message: "An error occurred while decrementing quantity",
      error: error.message,
    });
  }
};

// Function to remove a product from the cart
const removeProductFromCart = async (req, res) => {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const userId = req.user_id;
    const productId = req.params.productId;

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the cart item corresponding to the provided productId
    const cartItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    // Remove the item from the cart
    cart.items.splice(cartItemIndex, 1);

    await cart.save();

    res.json({ message: "Product removed from the cart successfully", cart });
  } catch (error) {
    console.error("Error removing product from the cart:", error);
    res.status(500).json({
      message: "An error occurred while removing the product from the cart",
      error: error.message,
    });
  }
};

module.exports = {
  addToCart,
  viewCart,
  decrementQuantity,
  removeProductFromCart,
};
