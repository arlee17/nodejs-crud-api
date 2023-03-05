const db = require('../database/dbService');
const { createOneRecipe } = require('../services/recipeService');

describe('createOneRecipe', () => {
    let req;
    let res;

    beforeEach(() => {
        req = {
            body: {
                name: 'Test recipe',
                type: 'Test type',
                description: 'Test description',
                ingredients: ['Ingredient 1', 'Ingredient 2'],
                instructions: ['Step 1', 'Step 2'],
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should return message: "Recipe successfully created" when valid recipe is provided', async () => {
        const mockQuery = jest.spyOn(db, 'query').mockImplementation(() => ({ affectedRows: 1 }));
        const recipe = {
            name: 'Test Recipe',
            type: 'Test Type',
            description: 'Test Description',
            ingredients: JSON.stringify(['Test Ingredient']),
            instructions: JSON.stringify(['Test Instruction']),
        };
        const result = await createOneRecipe(recipe);
        expect(mockQuery).toHaveBeenCalledTimes(1);
        expect(mockQuery).toHaveBeenCalledWith(expect.any(String), [recipe.name, recipe.type, recipe.description, recipe.ingredients, recipe.instructions]);
        expect(result).toEqual({ message: 'Recipe successfully created' });
    });

    test('should throw an error with message "Error while creating recipe" when no rows are affected by the query', async () => {
        const mockQuery = jest.spyOn(db, 'query').mockImplementation(() => ({ affectedRows: 0 }));
        const recipe = {
            name: 'Test Recipe',
            type: 'Test Type',
            description: 'Test Description',
            ingredients: JSON.stringify(['Test Ingredient']),
            instructions: JSON.stringify(['Test Instruction']),
        };
        await expect(createOneRecipe(recipe)).rejects.toThrow('Error while creating recipe');
        expect(mockQuery).toHaveBeenCalledTimes(1);
        expect(mockQuery).toHaveBeenCalledWith(expect.any(String), [recipe.name, recipe.type, recipe.description, recipe.ingredients, recipe.instructions]);
    });

    test('should throw an error with message "Error while creating recipe" when an error occurs during the query', async () => {
        const errorMessage = 'Test Error';
        const mockQuery = jest.spyOn(db, 'query').mockImplementation(() => { throw new Error(errorMessage); });
        const recipe = {
            name: 'Test Recipe',
            type: 'Test Type',
            description: 'Test Description',
            ingredients: JSON.stringify(['Test Ingredient']),
            instructions: JSON.stringify(['Test Instruction']),
        };
        await expect(createOneRecipe(recipe)).rejects.toThrow(`Error while creating recipe: ${errorMessage}`);
        expect(mockQuery).toHaveBeenCalledTimes(1);
        expect(mockQuery).toHaveBeenCalledWith(expect.any(String), [recipe.name, recipe.type, recipe.description, recipe.ingredients, recipe.instructions]);
    });
});
