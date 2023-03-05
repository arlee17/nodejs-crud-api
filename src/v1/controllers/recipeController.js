const recipeService = require('../services/recipeService');

const getAllRecipes = (req, res) => {
    try {
        const allRecipes = recipeService.getAllRecipes();
        res.send({status: 'success', data: allRecipes});
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "error", data: { error: error?.message || error } });        
    }
};

const getOneRecipe = (req, res) => {
    const {
        params: { recipeId },
    } = req;
    if ( !recipeId) {
        res
        .status(400)
        .send({
          status: "error",
          data: { error: "Parameter ':recipeId' can not be empty" },
        });
    }
    try {
        const recipe = recipeService.getOneRecipe(recipeId);
        res.send({status: 'success', data: recipe});
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "error", data: { error: error?.message || error } });
    }
    
};

const createOneRecipe = (req, res) => {
    const { body } = req;
    if (
        !body.name ||
        !body.type ||
        !body.description ||
        !body.ingredients ||
        !body.instructions
    ) {
        res
        .status(400)
        .send({
          status: "error",
          data: {
            error:
              "One of the following keys is missing or is empty in request body: 'name', 'type', 'description', 'ingredients', 'instructions'",
          },
        });
      return;
    }
    const newRecipe = {
        name: body.name,
        type: body.type,
        description: body.description,
        ingredients: body.ingredients,
        instructions: body.instructions
    }
    try {
        const createdRecipe = recipeService.createOneRecipe(newRecipe);
        res
        .status(201)
        .send({status: 'success', data: createdRecipe});
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "error", data: { error: error?.message || error } });        
    }
};

const updateOneRecipe = (req, res) => {
    const {
        body,
        params: { recipeId },
    } = req;
    if (!recipeId) {
        res
        .status(400)
        .send({
          status: "error",
          data: { error: "Parameter ':recipeId' can not be empty" },
        });
    }
    try {
        const updatedRecipe = recipeService.updateOneRecipe(recipeId, body);
        res.send({ status: 'success', data: updatedRecipe });
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "error", data: { error: error?.message || error } });        
    }
};

const deleteOneRecipe = (req, res) => {
    const {
        params: { recipeId },
    } = req;
    if (!recipeId) {
        res
        .status(400)
        .send({
          status: "error",
          data: { error: "Parameter ':recipeId' can not be empty" },
        });
    }
    try {
        recipeService.deleteOneRecipe(recipeId);
        res.status(204).send({status: 'success'});
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "error", data: { error: error?.message || error } });        
    }
};

module.exports = {
    getAllRecipes,
    getOneRecipe,
    createOneRecipe,
    updateOneRecipe,
    deleteOneRecipe
};
