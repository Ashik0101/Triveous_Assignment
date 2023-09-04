const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeMiddleware = require("../middlewares/authorizeMiddleware");

// Route to insert a new product
/**
 * @swagger
 * tags:
 *   - name: Products
 *     description: API endpoints related to products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         category:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: string
 *         image:
 *           type: string
 *         availability:
 *           type: boolean
 *         quantity:
 *           type: integer
 *       required:
 *         - name
 *         - category
 *         - price
 *         - description
 *         - image
 *         - availability
 *         - quantity
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Insert a new product
 *     tags: [Products]
 *     description: Insert a new product with details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               availability:
 *                 type: boolean
 *               quantity:
 *                 type: integer
 *     security:
 *       - bearerAuth: []  # This associates the "bearerAuth" scheme with this route
 *     responses:
 *       '201':
 *         description: Product added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 savedProduct:
 *                   $ref: '#/components/schemas/Product'
 */

productRouter.post(
  "/",
  authMiddleware,
  authorizeMiddleware("seller"),
  productController.insertProduct
);

//Route to get a categories of products

/**
 * @swagger
 * /products/categories:
 *   get:
 *     summary: Get a list of product categories
 *     description: Retrieve a list of unique product categories.
 *     tags:
 *       - Products
 *     responses:
 *       '200':
 *         description: A JSON array of product categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *       '404':
 *         description: No categories found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No Categories Found
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

productRouter.get("/categories", productController.getCategories);

//Route to get products of a particular category
/**
 * @swagger
 * /products/category/{categoryName}:
 *   get:
 *     summary: Get products by category name
 *     description: Retrieve products by category name.
 *     tags:
 *       - Products
 *     parameters:
 *       - name: categoryName
 *         in: path
 *         description: Name of the category to filter products.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A JSON array of products in the specified category.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   availability:
 *                     type: boolean
 *                   category:
 *                     type: string
 *       '404':
 *         description: No products found in the specified category.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No products found in the category.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

productRouter.get(
  "/category/:categoryName",
  productController.getProductsByCategory
);

//Route to get product by it's ID
/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get product details by ID
 *     tags: [Products]
 *     description: Retrieve product details by specifying its unique ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique ID of the product to retrieve.
 *     responses:
 *       '200':
 *         description: Product details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product with ID {productId} not found.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 *                 error:
 *                   type: string
 *
 */

productRouter.get("/:productId", productController.getProductById);
module.exports = productRouter;
