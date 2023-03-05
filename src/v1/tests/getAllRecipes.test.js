const recipeService = require('../services/recipeService');
const { getAllRecipes } = require('../controllers/recipeController');

jest.mock('../services/recipeService');

describe('getAllRecipes', () => {
    const req = {};
    const res = {
        send: jest.fn(),
        status: jest.fn(() => res),
    };

    test('should return all recipes', () => {
        const allRecipes = [
            { id: 1, name: 'Recipe 1', ingredients: ['ingredient 1'] },
            { id: 2, name: 'Recipe 2', ingredients: ['ingredient 2'] },
        ];
        recipeService.getAllRecipes.mockReturnValue(allRecipes);
        getAllRecipes(req, res);
        expect(res.send).toHaveBeenCalledWith({ status: 'success', data: allRecipes });
    });

    test('should return an error if getAllRecipes throws an error', () => {
        const errorMessage = 'An error occurred';
        recipeService.getAllRecipes.mockImplementation(() => {
            throw new Error(errorMessage);
        });
        getAllRecipes(req, res);
        expect(res.send).toHaveBeenCalledWith({
            status: 'error',
            data: { error: errorMessage },
        });
        expect(res.status).toHaveBeenCalledWith(500);
    });
});
