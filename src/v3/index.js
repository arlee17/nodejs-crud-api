const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/recipeRoutes");
const cors = require("cors");
const { swaggerDocs: V2SwaggerDocs } = require("./swagger");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/v3/recipes',router)
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    V2SwaggerDocs(app, PORT);

});

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });
    