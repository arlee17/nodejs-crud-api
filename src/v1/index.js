const express = require("express");
const bodyParser = require("body-parser");
const v1RecipeRouter = require("./routes/recipeRoutes")
const { swaggerDocs: V1SwaggerDocs } = require("./swagger");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/recipes", v1RecipeRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    V1SwaggerDocs(app, PORT);
});
