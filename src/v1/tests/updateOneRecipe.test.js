const recipeService = require('../services/recipeService');
const { updateOneRecipe } = require('../controllers/recipeController');

jest.mock('../services/recipeService');

describe("updateOneRecipe", () => {
    
    test("should respond with status 400 and an error message if recipeId is not provided", () => {
        const req = { params: {}, body: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        updateOneRecipe(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            status: "error",
            data: { error: "Parameter ':recipeId' can not be empty" },
        });
    });

    test("should respond with status 200 and the updated recipe if recipe is successfully updated", () => {
        const req = { params: { recipeId: 1 }, body: { name: "New recipe" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const updatedRecipe = { id: 1, name: "New recipe" };
        jest.spyOn(recipeService, "updateOneRecipe").mockReturnValueOnce(updatedRecipe);
        updateOneRecipe(req, res);
        expect(res.send).toHaveBeenCalledWith({ status: "success", data: updatedRecipe });
    });

    test("should respond with an error message if recipeService.updateOneRecipe throws an error", () => {
        const req = { params: { recipeId: 1 }, body: { name: "New recipe" } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const error = new Error("Something went wrong");
        jest.spyOn(recipeService, "updateOneRecipe").mockImplementationOnce(() => {
            throw error;
        });
        updateOneRecipe(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            status: "error",
            data: { error: error.message },
        });
    });
});
