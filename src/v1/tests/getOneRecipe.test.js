const recipeService = require('../services/recipeService');
const { getOneRecipe } = require('../controllers/recipeController');

jest.mock('../services/recipeService');

describe("getOneRecipe", () => {
    
    test("should respond with status 400 and an error message if recipeId is not provided", () => {
        const req = { params: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        getOneRecipe(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            status: "error",
            data: { error: "Parameter ':recipeId' can not be empty" },
        });
    });

    test("should respond with status 200 and the recipe data if recipe is found", () => {
        const req = { params: { recipeId: 1 } };
        const res = {
            send: jest.fn(),
        };
        const recipeData = { id: 1, name: "Recipe 1", ingredients: ["ingredient 1", "ingredient 2"], instructions: "Cook it well" };
        jest.spyOn(recipeService, "getOneRecipe").mockReturnValueOnce(recipeData);
        getOneRecipe(req, res);
        expect(res.send).toHaveBeenCalledWith({ status: "success", data: recipeData });
    });

    test("should respond with an error message if recipeService.getOneRecipe throws an error", () => {
        const req = { params: { recipeId: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const error = new Error("Something went wrong");
        jest.spyOn(recipeService, "getOneRecipe").mockImplementationOnce(() => {
            throw error;
        });
        getOneRecipe(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            status: "error",
            data: { error: error.message },
        });
    });
});
