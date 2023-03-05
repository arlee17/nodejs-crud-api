const db = require('../database/dbService');
const { getAllRecipes } = require('../services/recipeService');

describe('getAllRecipes', () => {
    
    test('should return an object with the "data" property containing a list of recipes', async () => {
        const expectedRecipes = [
            { 
                id: 1, 
                name: 'Recipe 1', 
                type: 'Type 1', 
                description: 'Description 1', 
                ingredients: ['Ingredient 1'], 
                instructions: ['Instruction 1'], 
                createdAt: '2022-01-01', 
                updatedAt: '2022-01-01' 
            },
            { 
                id: 2, 
                name: 'Recipe 2', 
                type: 'Type 2', 
                description: 'Description 2', 
                ingredients: ['Ingredient 2'], 
                instructions: ['Instruction 2'], 
                createdAt: '2023-01-05', 
                updatedAt: '2023-01-05' 
            }
        ];
        db.query = jest.fn().mockResolvedValue(expectedRecipes.map(recipe => ({
            id: recipe.id,
            name: recipe.name,
            type: recipe.type,
            description: recipe.description,
            ingredients: JSON.stringify(recipe.ingredients),
            instructions: JSON.stringify(recipe.instructions),
            created_at: recipe.createdAt,
            updated_at: recipe.updatedAt,
        })));
        const response = await getAllRecipes();
        expect(response).toHaveProperty('data', expectedRecipes);
    });

    test('should throw an error if no recipes are found', async () => {
        db.query = jest.fn().mockResolvedValue([]);
        await expect(getAllRecipes()).rejects.toThrow('No recipes found');
    });

    test('should throw an error if an error occurs while getting recipes', async () => {
        db.query = jest.fn().mockRejectedValue(new Error('Database error'));
        await expect(getAllRecipes()).rejects.toThrow('Error while getting recipes: Database error');
    });
});
