const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/database");
const userRouter = require("./routes/userRoutes");
const app = express();
app.use(express.json());
app.use("/user", userRouter);
// Connect to the database
(async () => {
  await connectDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT} !`);
  });
})();
