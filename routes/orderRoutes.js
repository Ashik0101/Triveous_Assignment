const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");

const authMiddleware = require("../middlewares/authMiddleware");

//Route to create order
/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints related to the Orders.
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Place an order
 *     tags: [Orders]
 *     description: Place an order using items from the user's cart.
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     responses:
 *       '200':
 *         description: Order placed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the order.
 *                     user:
 *                       type: string
 *                       description: The user who placed the order.
 *                     items:
 *                       type: array
 *                       description: List of items in the order.
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: string
 *                             description: The ID of the product.
 *                           quantity:
 *                             type: integer
 *                             description: The quantity of the product in the order.
 *                     totalAmount:
 *                       type: number
 *                       description: The total amount of the order.
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
 *         description: Cart not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cart not found. Please add items to your cart first.
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

orderRouter.post("/", authMiddleware, orderController.placeOrder);

//Route to get order history
/**
 * @swagger
 * /order/order-history:
 *   get:
 *     summary: Get order history for an authenticated user
 *     tags: [Orders]
 *     description: Retrieve the order history of an authenticated user.
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     responses:
 *       '200':
 *         description: Order history retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   description: List of orders made by the user.
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the order.
 *                       user:
 *                         type: string
 *                         description: The user who placed the order.
 *                       items:
 *                         type: array
 *                         description: List of items in the order.
 *                         items:
 *                           type: object
 *                           properties:
 *                             product:
 *                               type: string
 *                               description: The ID of the product.
 *                             quantity:
 *                               type: integer
 *                               description: The quantity of the product in the order.
 *                       totalAmount:
 *                         type: number
 *                         description: The total amount of the order.
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

orderRouter.get(
  "/order-history",
  authMiddleware,
  orderController.getOrderHistory
);

//Route to get order details by id
/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: Get detailed information about an order
 *     tags: [Orders]
 *     description: Retrieve detailed information about a specific order by its ID.
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Order details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   type: object
 *                   description: Detailed information about the order.
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the order.
 *                     user:
 *                       type: string
 *                       description: The user who placed the order.
 *                     items:
 *                       type: array
 *                       description: List of items in the order.
 *                       items:
 *                         type: object
 *                         properties:
 *                           product:
 *                             type: string
 *                             description: The ID of the product.
 *                           quantity:
 *                             type: integer
 *                             description: The quantity of the product in the order.
 *                     totalAmount:
 *                       type: number
 *                       description: The total amount of the order.
 *       '403':
 *         description: Forbidden. Unauthorized access to order details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Order not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
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

orderRouter.get("/:orderId", authMiddleware, orderController.getOrderDetails);

module.exports = orderRouter;
