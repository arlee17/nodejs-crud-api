const { deleteOneRecipe } = require('../controllers/recipeController');
const Recipe = require('../models/recipeModel');

describe('deleteOneRecipe', () => {
    it('should delete an existing recipe', async () => {
        const mockRecipe = {
            id: '1',
            name: 'Recipe 1',
            description: 'Description 1',
            ingredients: ['ingredient 1', 'ingredient 2'],
            instructions: ['instruction 1', 'instruction 2'],
        };
        const mockReq = { params: { id: '1' } };
        jest.spyOn(Recipe, 'findByIdAndDelete').mockResolvedValue(mockRecipe);

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await deleteOneRecipe(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith(mockRecipe);
    });

    it('should return recipe not found when recipe does not exist', async () => {
        const mockReq = { params: { id: '2' } };
        jest.spyOn(Recipe, 'findByIdAndDelete').mockResolvedValue(null);

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await deleteOneRecipe(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.send).toHaveBeenCalledWith('Recipe not found');
    });

    it('should return server error when an error occurs', async () => {
        const mockError = new Error('Server Error');
        const mockReq = { params: { id: '1' } };
        jest.spyOn(Recipe, 'findByIdAndDelete').mockRejectedValue(mockError);

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await deleteOneRecipe(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith('Server Error');
    });
});
