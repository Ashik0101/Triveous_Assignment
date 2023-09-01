const express = require("express");
const { body } = require("express-validator");

const userRouter = express.Router();
const userController = require("../controllers/userController");

// Define route for user registration
userRouter.post(
  "/register",
  [
    // check("username").notEmpty().withMessage("Username is required."),
    // check("email")
    //   .notEmpty()
    //   .withMessage("Email is required.")
    //   .isEmail()
    //   .withMessage("Please provide a valid email."),
    // check("password")
    //   .notEmpty()
    //   .withMessage("Password is required.")
    //   .isLength({ min: 8 })
    //   .withMessage("Password must be at least 8 characters."),
    body("username").notEmpty().withMessage("Username is required."),
    body("email")
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please provide a valid email."),
    body("password")
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters."),
  ],
  userController.registerUser
);

// user login
userRouter.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Please provide a valid email."),
    body("password")
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters."),
  ],
  userController.loginUser
);

module.exports = userRouter;
