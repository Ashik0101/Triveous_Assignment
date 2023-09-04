const swaggerJsdoc = require("swagger-jsdoc");

// configure specification for swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Triveous Swagger Documentation",
      version: "1.0.0",
    },
    server: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
