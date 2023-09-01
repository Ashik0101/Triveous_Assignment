const rateLimit = require("express-rate-limit");

// Create a rate limiter instance
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

module.exports = limiter;
