const { v4: uuid } = require("uuid");
const Recipe = require("../database/Recipe");

const getAllRecipes = () => {
    try {
        const allRecipes = Recipe.getAllRecipes();
        return allRecipes;
    } catch (error) {
        throw error;    
    }
};

const getOneRecipe = (recipeId) => {
    try {
        const recipe = Recipe.getOneRecipe(recipeId);
        return recipe;
    } catch (error) {
        throw error;    
    }
};

const createOneRecipe = (newRecipe) => {
    const recipeToInsert = {
        id: uuid(),
        ...newRecipe,
        createdAt: new Date().toLocaleString("es-ES", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("es-ES", { timeZone: "UTC" }),
    };
    try {
        const createdRecipe = Recipe.createOneRecipe(recipeToInsert);
        return createdRecipe;
    } catch (error) {
        throw error;        
    }
};

const updateOneRecipe = ( recipeId, change) => {
    try {
        const updatedRecipe = Recipe.updateOneRecipe( recipeId, change);
        return updatedRecipe;
    } catch (error) {
        throw error;        
    }
};

const deleteOneRecipe = ( recipeId ) => {
    try {
        Recipe.deleteOneRecipe( recipeId );
    } catch (error) {
        throw error;                
    }
};

module.exports = {
    getAllRecipes,
    getOneRecipe,
    createOneRecipe,
    updateOneRecipe,
    deleteOneRecipe,
};
