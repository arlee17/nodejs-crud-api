const { createOneRecipe } = require('../controllers/recipeController');
const Recipe = require('../models/recipeModel');

describe('createOneRecipe', () => {
    it('should create a new recipe', async () => {
        const mockRecipe = {
            id: '1',
            name: 'Recipe 1',
            description: 'Description 1',
            ingredients: ['ingredient 1', 'ingredient 2'],
            instructions: ['instruction 1', 'instruction 2'],
        };
        const mockReq = { body: mockRecipe };
        jest.spyOn(Recipe.prototype, 'save').mockResolvedValue(mockRecipe);
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await createOneRecipe(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.send).toHaveBeenCalledWith(mockRecipe);
    });

    it('should return server error when an error occurs', async () => {
        const mockError = new Error('Server Error');
        const mockReq = {
            body: {
                name: 'Recipe 1',
                description: 'Description 1',
                ingredients: ['ingredient 1', 'ingredient 2'],
                instructions: ['instruction 1', 'instruction 2'],
            },
        };
        jest.spyOn(Recipe.prototype, 'save').mockRejectedValue(mockError);
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await createOneRecipe(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith('Server Error');
    });
});
