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

const router = require("express").Router();
const { 
    getAllRecipes,
    getOneRecipe,
    createOneRecipe,
    updateOneRecipe,
    deleteOneRecipe 
} = require("../controllers/recipeController")

/**
 * @openapi
 * /api/v3/recipes:
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
router.get("/", getAllRecipes);

/**
 * @openapi
 * /api/v3/recipes/{recipeId}:
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
router.get("/:id", getOneRecipe);

/**
 * @openapi
 * /api/v3/recipes/{recipeId}:
 *   put:
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
router.put("/:id", updateOneRecipe);

/**
 * @openapi
 * /api/v3/recipes/{recipeId}:
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
router.delete("/:id", deleteOneRecipe);

/**
 * @openapi
 * /api/v3/recipes/:
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
router.post("/", createOneRecipe);

module.exports = router;
