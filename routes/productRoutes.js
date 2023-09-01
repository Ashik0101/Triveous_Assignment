const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeMiddleware = require("../middlewares/authorizeMiddleware");

// Route to insert a new product

productRouter.post(
  "/",
  authMiddleware,
  authorizeMiddleware("seller"),
  productController.insertProduct
);

//Route to get a categories of products
productRouter.get("/categories", productController.getCategories);

//Route to get products of a particular category
productRouter.get(
  "/category/:categoryName",
  productController.getProductsByCategory
);

//Route to get product by it's ID
productRouter.get("/:productId", productController.getProductById);
module.exports = productRouter;
