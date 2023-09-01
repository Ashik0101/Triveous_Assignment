const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connection = require("./config/database");

const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoutes");
const limiter = require("./middlewares/rateLimiter");

const app = express();
app.use(express.json());

app.use("/auth", limiter, userRouter);
app.use("/products", limiter, productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
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
