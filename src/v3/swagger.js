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
        "./routes/recipeRoutes.js"
    ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use("/api/v3/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/api/v3/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
    console.log(
        `Docs of version 3 are available on http://localhost:${port}/api/v3/docs`
    );
};

module.exports = { swaggerDocs };
