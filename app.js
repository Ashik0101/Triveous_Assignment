const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connection = require("./config/database");

const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoutes");
const limiter = require("./middlewares/rateLimiter");

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/auth", limiter, userRouter);
app.use("/products", limiter, productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello, Welcome to Triveous API" });
});

// Connect to the database
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB !");
    console.log(`Listening on PORT ${process.env.PORT} !`);
  } catch (error) {
    console.log("Some error occurred while conneting to db:", error.message);
  }
});
