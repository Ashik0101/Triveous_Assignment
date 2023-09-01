const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/database");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const connection = require("./config/database");
const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use("/products", productRouter);

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
