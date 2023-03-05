const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const recipeRoutes = require('./routes/recipeRoutes');
const { swaggerDocs: V2SwaggerDocs } = require("./swagger");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({ message: "success" });
});

app.use('/api/v2/recipes', recipeRoutes);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
    V2SwaggerDocs(app, PORT);
});
