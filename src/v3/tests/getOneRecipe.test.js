const { getOneRecipe } = require('../controllers/recipeController');
const Recipe = require('../models/recipeModel');

describe('getOneRecipe', () => {
    it('should return a recipe', async () => {
        const mockRecipe = { id: '1', name: 'Recipe 1' };
        const mockReq = { params: { id: '1' } };
        jest.spyOn(Recipe, 'findById').mockResolvedValue(mockRecipe);
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await getOneRecipe(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith(mockRecipe);
    });

    it('should return 404 if recipe not found', async () => {
        const mockReq = { params: { id: '2' } };
        jest.spyOn(Recipe, 'findById').mockResolvedValue(null);

        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await getOneRecipe(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.send).toHaveBeenCalledWith('Recipe not found');
    });

    it('should return 404 if invalid recipe id is provided', async () => {
        const mockReq = { params: { id: 'invalid_id' } };
        const mockError = { kind: 'ObjectId' };
        jest.spyOn(Recipe, 'findById').mockRejectedValue(mockError);
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await getOneRecipe(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.send).toHaveBeenCalledWith('Recipe not found');
    });
});
