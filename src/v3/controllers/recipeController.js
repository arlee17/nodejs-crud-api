const Recipe = require('../models/recipeModel')

const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).send(recipes);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

const getOneRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).send('Recipe not found');
        res.status(200).send(recipe);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send('Recipe not found');
        }
        res.status(500).send('Server Error');
    }
};

const createOneRecipe = async (req, res) => {
    const { name, description, ingredients, instructions } = req.body;
    try {
        const newRecipe = new Recipe({
            name,
            description,
            ingredients,
            instructions,
        });
        const recipe = await newRecipe.save();
        res.status(201).send(recipe);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

const updateOneRecipe = async (req, res) => {
    const { name, description, ingredients, instructions } = req.body;
    try {
        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            {
                name,
                description,
                ingredients,
                instructions,
            },
            { new: true }
        );
        if (!recipe) return res.status(404).send('Recipe not found');
        res.status(200).send(recipe);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send('Recipe not found');
        }
        res.status(500).send('Server Error');
    }
};

const deleteOneRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) return res.status(404).send('Recipe not found');
        res.status(200).send(recipe);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send('Recipe not found');
        }
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllRecipes,
    getOneRecipe,
    createOneRecipe,
    updateOneRecipe,
    deleteOneRecipe
};
