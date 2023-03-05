/**
 * @openapi
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name: 
 *           type: string
 *           example: Spaghetti Bolognese  
 *         type:
 *           type: string
 *           example: Meat
 *         description:
 *           type: string
 *           example: A classic 
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *           example: ["1 lb spaghetti", "1 lb ground beef", "1 onion, chopped", "2 cloves garlic, minced", "2 cloves garlic, minced"]
 *         instructions:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Cook spaghetti according to package instructions.", "Meanwhile, brown the ground beef in a large skillet over medium-high heat.", "Add in the chopped onion and minced garlic. Cook until softened."]
 *         createdAt:
 *           type: string
 *           example: 03/03/2023, 12:21:56 PM
 *         updatedAt: 
 *           type: string
 *           example: 03/03/2023, 12:21:56 PM
 */

const DB = require('./db.json');
const { saveToDatabase } = require("./utils");

const getAllRecipes = () => {
    try {
        return DB.recipes;
    } catch (error) {
        throw { status: 500, message: error };
    }
}



const getOneRecipe = (recipeId) => {
    try {
        const recipe = DB.recipes.find((recipe) => recipe.id === recipeId);
        if (!recipe) {
            throw {
                status: 400,
                message: `Can't find recipe with the id '${recipeId}'`,
            };
        }
        return recipe;
    } catch (error) {
        throw { 
            status: error?.status || 500, 
            message: error?.message || error 
        };
    }
};

const createOneRecipe = (newRecipe) => {
    try {
        const isAlreadyAdded =
            DB.recipes.findIndex((recipe) => recipe.name === newRecipe.name) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Recipe with the name '${newRecipe.name}' already exists`,
            };
        }
        DB.recipes.push(newRecipe);
        saveToDatabase(DB);
        return newRecipe;
    } catch (error) {
        throw {
            status: 500,
            message: error?.message || error
        };
    }
};

const updateOneRecipe = (recipeId, change) => {
    try {
        const index = DB.recipes.findIndex((recipe) => recipe.id === recipeId);
        if (index === -1) {
            return;
        }
        const updatedRecipe = {
            ...DB.recipes[index],
            ...change,
            updatedAt: new Date().toLocaleString("es-ES", { timeZone: "UTC" }),
        };
        DB.recipes[index] = updatedRecipe;
        saveToDatabase(DB);
        return updatedRecipe;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };        
    }
}

const deleteOneRecipe = (recipeId) => {
    try {
        const index = DB.recipes.findIndex((recipe) => recipe.id === recipeId);
        if (index === -1) {
            return;
        }
        DB.recipes.splice(index, 1);
        saveToDatabase(DB);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };        
    }
}


module.exports = {
    getOneRecipe,
    getAllRecipes,
    createOneRecipe,
    updateOneRecipe,
    deleteOneRecipe
};
