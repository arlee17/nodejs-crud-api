const { getAllRecipes } = require('../controllers/recipeController');
const Recipe = require('../models/recipeModel');

describe('getAllRecipes', () => {
    it('should return all recipes', async () => {
        const mockRecipes = [
            { id: '1', name: 'Recipe 1' },
            { id: '2', name: 'Recipe 2' },
        ];
        jest.spyOn(Recipe, 'find').mockResolvedValue(mockRecipes);
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await getAllRecipes(null, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith(mockRecipes);
    });

    it('should return server error when an error occurs', async () => {
        const mockError = new Error('Server Error');
        jest.spyOn(Recipe, 'find').mockRejectedValue(mockError);
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await getAllRecipes(null, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith('Server Error');
    });
});
