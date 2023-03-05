const db = require('../database/dbService');
const { updateOneRecipe } = require('../services/recipeService');

describe('updateOneRecipe', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should update a recipe in the database', async () => {
        const id = 1;
        const recipe = {
            name: 'Updated Recipe',
            type: 'Updated Type',
            description: 'Updated Description',
            ingredients: ['Updated Ingredient'],
            instructions: ['Updated Instruction'],
        };
        const mockQuery = jest.fn().mockImplementation(() => ({ affectedRows: 1 }));
        db.query = mockQuery;

        const result = await updateOneRecipe(id, recipe);

        expect(mockQuery).toHaveBeenCalledTimes(1);
        expect(mockQuery).toHaveBeenCalledWith(
            expect.stringContaining('UPDATE'),
            [recipe.name, recipe.type, recipe.description, JSON.stringify(recipe.ingredients), JSON.stringify(recipe.instructions), id]
        );
        expect(result).toEqual({ message: 'Recipe successfully updated' });
    });

    test('should throw an error if the recipe is not updated', async () => {
        const id = 2;
        const recipe = {
            name: 'Updated Recipe',
            type: 'Updated Type',
            description: 'Updated Description',
            ingredients: ['Updated Ingredient'],
            instructions: ['Updated Instruction'],
        };
        const mockQuery = jest.fn().mockImplementation(() => ({ affectedRows: 0 }));
        db.query = mockQuery;
        await expect(updateOneRecipe(id, recipe)).rejects.toThrow('Error in updating recipe');
        expect(mockQuery).toHaveBeenCalledTimes(1);
        expect(mockQuery).toHaveBeenCalledWith(
            expect.stringContaining('UPDATE'),
            [recipe.name, recipe.type, recipe.description, JSON.stringify(recipe.ingredients), JSON.stringify(recipe.instructions), id]
        );
    });

    test('should throw an error if there is an error in the database query', async () => {
        const id = 3;
        const recipe = {
            name: 'Updated Recipe',
            type: 'Updated Type',
            description: 'Updated Description',
            ingredients: ['Updated Ingredient'],
            instructions: ['Updated Instruction'],
        };
        const mockQuery = jest.fn().mockImplementation(() => { throw new Error('Database Error'); });
        db.query = mockQuery;
        await expect(updateOneRecipe(id, recipe)).rejects.toThrow('Error while updating recipe: Database Error');
        expect(mockQuery).toHaveBeenCalledTimes(1);
        expect(mockQuery).toHaveBeenCalledWith(
            expect.stringContaining('UPDATE'),
            [recipe.name, recipe.type, recipe.description, JSON.stringify(recipe.ingredients), JSON.stringify(recipe.instructions), id]
        );
    });
});
