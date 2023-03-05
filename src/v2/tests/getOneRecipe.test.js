const db = require('../database/dbService');
const { getOneRecipe } = require('../services/recipeService');

describe('getOneRecipe', () => {
    
    test('should return an object with the "data" property containing the recipe with the given ID', async () => {
        const expectedRecipe = { 
            id: 1, 
            name: 'Recipe 1', 
            type: 'Type 1', 
            description: 'Description 1', 
            ingredients: ['Ingredient 1'], 
            instructions: ['Instruction 1'], 
            createdAt: '2022-01-01', 
            updatedAt: '2022-01-01' 
        };

        db.query = jest.fn().mockResolvedValue([{
            id: expectedRecipe.id,
            name: expectedRecipe.name,
            type: expectedRecipe.type,
            description: expectedRecipe.description,
            ingredients: JSON.stringify(expectedRecipe.ingredients),
            instructions: JSON.stringify(expectedRecipe.instructions),
            created_at: expectedRecipe.createdAt,
            updated_at: expectedRecipe.updatedAt,
        }]);

        const response = await getOneRecipe(expectedRecipe.id);
        const expectedResponse = { data: [expectedRecipe] };
        expect(response).toEqual(expectedResponse);
    });

    test('should throw an error if no recipe is found with the given ID', async () => {
        const nonExistentId = 999999;
        db.query = jest.fn().mockResolvedValue([]);
        await expect(getOneRecipe(nonExistentId)).rejects.toThrow(`Error while getting recipe with id ${nonExistentId}`);
    });

    test('should throw an error if an error occurs while getting a recipe', async () => {
        const recipeId = 1;
        db.query = jest.fn().mockRejectedValue(new Error('Database error'));
        await expect(getOneRecipe(recipeId)).rejects.toThrow(`Error while getting recipe with id ${recipeId}: Error: Database error`);
    });
});
