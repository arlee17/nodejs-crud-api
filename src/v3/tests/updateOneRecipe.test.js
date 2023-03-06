const { updateOneRecipe } = require('../controllers/recipeController');
const Recipe = require('../models/recipeModel');

jest.mock('../models/recipeModel', () => ({
    findByIdAndUpdate: jest.fn(),
}));

describe('updateOneRecipe', () => {
    it('should update a recipe successfully', async () => {
        const recipeId = '123456789';
        const updatedRecipe = {
            name: 'New Recipe Name',
            description: 'New Recipe Description',
            ingredients: ['New Ingredient 1', 'New Ingredient 2'],
            instructions: 'New Recipe Instructions',
        };
        Recipe.findByIdAndUpdate.mockResolvedValue(updatedRecipe);
        const req = {
            params: { id: recipeId },
            body: updatedRecipe,
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await updateOneRecipe(req, res);
        expect(Recipe.findByIdAndUpdate).toHaveBeenCalledWith(recipeId, updatedRecipe, { new: true });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(updatedRecipe);
    });

    it('should return a 404 error if the recipe is not found', async () => {
        const recipeId = '123456789';
        const updatedRecipe = {
            name: 'New Recipe Name',
            description: 'New Recipe Description',
            ingredients: ['New Ingredient 1', 'New Ingredient 2'],
            instructions: 'New Recipe Instructions',
        };
        Recipe.findByIdAndUpdate.mockResolvedValue(null);
        const req = {
            params: { id: recipeId },
            body: updatedRecipe,
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await updateOneRecipe(req, res);
        expect(Recipe.findByIdAndUpdate).toHaveBeenCalledWith(recipeId, updatedRecipe, { new: true });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith('Recipe not found');
    });

    it('should return a 500 error if an error occurs', async () => {
        const recipeId = '123456789';
        const updatedRecipe = {
            name: 'New Recipe Name',
            description: 'New Recipe Description',
            ingredients: ['New Ingredient 1', 'New Ingredient 2'],
            instructions: 'New Recipe Instructions',
        };
        Recipe.findByIdAndUpdate.mockRejectedValue(new Error('Server Error'));
        const req = {
            params: { id: recipeId },
            body: updatedRecipe,
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await updateOneRecipe(req, res);
        expect(Recipe.findByIdAndUpdate).toHaveBeenCalledWith(recipeId, updatedRecipe, { new: true });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith('Server Error');
    });
});
