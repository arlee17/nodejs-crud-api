const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

/**
 * @openapi
 * /api/v1/recipes:
 *   get:
 *     summary: Get all recipes
 *     tags:
 *       - All Recipes
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router.get("/", recipeController.getAllRecipes);

/**
 * @openapi
 * /api/v1/recipes/{recipeId}:
 *   get:
 *     summary: Get one recipe
 *     tags:
 *       - Recipe
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Recipe found
 */
router.get("/:recipeId", recipeController.getOneRecipe);


/**
 * @openapi
 * /api/v1/recipes/:
 *   post:
 *     summary: Create new recipe
 *     tags:
 *       - Create recipe
 *     requestBody:
 *       description: Recipe
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       '200':
 *         description: Added recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 */
router.post("/", recipeController.createOneRecipe);

/**
 * @openapi
 * /api/v1/recipes/{recipeId}:
 *   patch:
 *     summary: Update one recipe
 *     tags:
 *       - Update recipe
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         type: string
 *     requestBody:
 *       description: Recipe
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       '200':
 *         description: Recipe updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 */
router.patch("/:recipeId", recipeController.updateOneRecipe);

/**
 * @openapi
 * /api/v1/recipes/{recipeId}:
 *   delete:
 *     summary: Delete recipe
 *     tags:
 *       - Delete recipe
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         required: true
 *         type: string
 *         description : Delete recipe
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe deleted
 */
router.delete("/:recipeId", recipeController.deleteOneRecipe);


module.exports = router;
