const express = require("express");
const { body } = require("express-validator");

const userRouter = express.Router();
const userController = require("../controllers/userController");
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API endpoints related to users
 */

// Define route for user registration
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     description: Register a new user with a unique username and a valid email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password for the user account. Must be at least 8 characters long.
 *             example:
 *               username: john_doe
 *               email: johndoe@example.com
 *               password: mysecurepassword
 *     responses:
 *       '201':
 *         description: User registration successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating registration success.
 *       '400':
 *         description: Bad request. Validation error or user already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         description: Error message for each validation error.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating internal server error.
 *                 error:
 *                   type: string
 *                   description: The detailed error message.
 */

userRouter.post(
  "/register",
  [
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
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login as an existing user
 *     tags: [Users]
 *     description: Authenticate an existing user with their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *               password:
 *                 type: string
 *                 description: The password associated with the user's account.
 *             example:
 *               email: johndoe@example.com
 *               password: mysecurepassword
 *     responses:
 *       '200':
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message indicating login success.
 *                 token:
 *                   type: string
 *                   description: A JWT token for authenticated requests.
 *       '401':
 *         description: Unauthorized. Incorrect password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating incorrect password.
 *       '404':
 *         description: Not Found. User not found with the provided email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating user not found.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: An error message indicating internal server error.
 *                 error:
 *                   type: string
 *                   description: The detailed error message.
 */

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
