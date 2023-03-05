const db = require('../database/dbService');
const { deleteOneRecipe } = require('../services/recipeService');


describe('deleteOneRecipe', () => {

    test('should delete recipe with valid id', async () => {
        const mockDbQuery = jest.fn(() => ({ affectedRows: 1 }));
        jest.spyOn(db, 'query').mockImplementation(mockDbQuery);
        const result = await deleteOneRecipe(1);
        expect(db.query).toHaveBeenCalledTimes(1);
        expect(mockDbQuery.mock.calls[0][0]).toBe('DELETE FROM recipes WHERE id=?');
        expect(mockDbQuery.mock.calls[0][1]).toEqual([1]);
        expect(result).toEqual({ message: 'Recipe successfully deleted' });
    });

    test('should throw error with invalid id', async () => {
        const mockDbQuery = jest.fn(() => ({ affectedRows: 0 }));
        jest.spyOn(db, 'query').mockImplementation(mockDbQuery);
        await expect(deleteOneRecipe(2)).rejects.toThrow('Error in deleting recipe');
    });

    test('should throw error with database error', async () => {
        const mockDbQuery = jest.fn(() => {
            throw new Error('Database error');
        });
        jest.spyOn(db, 'query').mockImplementation(mockDbQuery);
        await expect(deleteOneRecipe(1)).rejects.toThrow('Error while deleting recipe: Database error');
    });
});
