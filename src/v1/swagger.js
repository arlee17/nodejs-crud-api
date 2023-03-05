const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Recipes from around the world",
      version: "1.0.0"
    },
  },
  apis: [
    "./routes/recipeRoutes.js",
    "./database/Recipe.js"
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Docs of version 1 are available on http://localhost:${port}/api/v1/docs`
  );
};

module.exports = { swaggerDocs }
