const recipeService = require('../services/recipeService');
const { createOneRecipe } = require('../controllers/recipeController');

jest.mock('../services/recipeService');

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

    it('should create a new recipe and return it in the response', () => {
        const createdRecipe = {
            id: 'abc123',
            name: 'Test recipe',
            type: 'Test type',
            description: 'Test description',
            ingredients: ['Ingredient 1', 'Ingredient 2'],
            instructions: ['Step 1', 'Step 2'],
        };
        recipeService.createOneRecipe.mockReturnValue(createdRecipe);
        createOneRecipe(req, res);
        expect(recipeService.createOneRecipe).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({
            status: 'success',
            data: createdRecipe,
        });
    });

    it('should return an error response if any required field is missing from the request body', () => {
        req.body.name = undefined;
        createOneRecipe(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            status: 'error',
            data: {
                error:
                    "One of the following keys is missing or is empty in request body: 'name', 'type', 'description', 'ingredients', 'instructions'",
            },
        });
        expect(recipeService.createOneRecipe).not.toHaveBeenCalled();
    });

    it('should return an error response if an error occurs while creating the recipe', () => {
        const errorMessage = 'An error occurred while creating the recipe';
        recipeService.createOneRecipe.mockImplementation(() => {
            throw new Error(errorMessage);
        });
        createOneRecipe(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            status: 'error',
            data: { error: errorMessage },
        });
    });
});
