const Product = require("../models/Product");

// Function to insert a new product into the database
const insertProduct = async (req, res) => {
  try {
    // Check if all required fields are provided in the request body
    const requiredFields = [
      "name",
      "category",
      "price",
      "description",
      "image",
      "quantity",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Create a new product based on the request body
    const newProduct = new Product({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      availability: req.body.availability,
      quantity: req.body.quantity,
      user_id: req.user_id,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json({ message: "Product Added", savedProduct });
  } catch (error) {
    console.error("Error  Inserting Product:", error);
    res.status(500).json({
      message: "Error Inserting Product",
      error: error.message,
    });
  }
};

//Function to retrieve the categories

const getCategories = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      { $group: { _id: "$category" } },
      { $project: { _id: 0, category: "$_id" } },
    ]);

    if (categories.length === 0) {
      return res.status(404).json({ message: "No Categories Found" });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error Fetching Categories: ", error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Function to retrieve products by category name
const getProductsByCategory = async (req, res) => {
  const { categoryName } = req.params;

  try {
    const products = await Product.find(
      { category: { $regex: categoryName, $options: "i" } },
      {
        name: 1,
        price: 1,
        description: 1,
        availability: 1,
        category: 1,
        _id: 1,
      }
    );

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: `No products found in category ${categoryName}.` });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(
      `Error fetching products in category ${categoryName}:`,
      error
    );
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Function to retrieve product details by ID

const getProductById = async (req, res) => {
  const { productId } = req.params;

  try {
    // Find the product by its ID
    const product = await Product.find({ _id: productId });

    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID ${productId} not found.` });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Decrement product quantity when product gets added to Cart
const decrementProductQuantity = async (productId, quantityToDecrement) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error(`Product with ID ${productId} not found`);
  }
  if (product.quantity < quantityToDecrement) {
    throw new Error(`Not enough quantity available for product ${productId}`);
  }

  product.quantity -= quantityToDecrement;
  if (product.quantity === 0) {
    product.availability = false;
  }
  await product.save();
};

module.exports = {
  insertProduct,
  getCategories,
  getProductsByCategory,
  getProductById,
  decrementProductQuantity,
};
