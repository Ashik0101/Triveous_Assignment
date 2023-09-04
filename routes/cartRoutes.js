const express = require("express");
const cartRouter = express.Router();
const cartController = require("../controllers/cartController");
const { body, param } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API endpoints related to the user's shopping cart.
 */

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add a product to the cart or increment its quantity.
 *     tags: [Cart]
 *     description: Add a product to the user's cart or increment its quantity if it's already in the cart.
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: The ID of the product to add to the cart.
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product to add to the cart. If not provided, it defaults to 1.
 *     responses:
 *       '200':
 *         description: Product added to the cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   type: object
 *                   description: The user's updated cart.
 *       '400':
 *         description: Bad request. The request body is missing required fields or contains invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   description: An array of validation errors, if any.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

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

/**
 * @swagger
 * /cart/view:
 *   get:
 *     summary: View the user's shopping cart.
 *     tags: [Cart]
 *     description: Retrieve the details of the user's shopping cart.
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     responses:
 *       '200':
 *         description: Cart details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   type: object
 *                   description: The user's shopping cart with product details.
 *       '404':
 *         description: Cart not found for this user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cart not found for this user
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

cartRouter.get("/view", authMiddleware, cartController.viewCart);

//Route for decrementing quantity
/**
 * @swagger
 * /cart/decrement/{productId}:
 *   patch:
 *     summary: Decrement the quantity of a product in the cart by 1.
 *     tags: [Cart]
 *     description: Decrement the quantity of a specific product in the user's shopping cart.
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to decrement in the cart.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Quantity decremented successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   type: object
 *                   description: The user's updated shopping cart.
 *       '400':
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   description: An array of validation errors, if any.
 *       '404':
 *         description: Cart or product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cart not found or Product not found in the cart
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

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
/**
 * @swagger
 * /cart/remove/{productId}:
 *   delete:
 *     summary: Remove a product from the cart.
 *     tags: [Cart]
 *     description: Remove a specific product from the user's shopping cart.
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to remove from the cart.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product removed from the cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 cart:
 *                   type: object
 *                   description: The user's updated shopping cart.
 *       '400':
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   description: An array of validation errors, if any.
 *       '404':
 *         description: Cart or product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cart not found or Product not found in the cart
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */

cartRouter.delete(
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
