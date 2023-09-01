const mongoose = require("mongoose");

require("dotenv").config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB !");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error.message);
//   }
// };

const connection = mongoose.connect(process.env.MONGO_URI);
module.exports = connection;
// module.exports = connectDB;
