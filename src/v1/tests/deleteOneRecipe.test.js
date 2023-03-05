const recipeService = require('../services/recipeService');
const { deleteOneRecipe } = require('../controllers/recipeController');

jest.mock('../services/recipeService');

describe("deleteOneRecipe", () => {

    test("should respond with status 400 and an error message if recipeId is not provided", () => {
        const req = { params: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        deleteOneRecipe(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            status: "error",
            data: { error: "Parameter ':recipeId' can not be empty" },
        });
    });

    test("should respond with status 204 and a success message if recipe is successfully deleted", () => {
        const req = { params: { recipeId: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        jest.spyOn(recipeService, "deleteOneRecipe").mockReturnValueOnce();
        deleteOneRecipe(req, res);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalledWith({ status: "success" });
    });

    test("should respond with an error message if recipeService.deleteOneRecipe throws an error", () => {
        const req = { params: { recipeId: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const error = new Error("Something went wrong");
        jest.spyOn(recipeService, "deleteOneRecipe").mockImplementationOnce(() => {
            throw error;
        });
        deleteOneRecipe(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            status: "error",
            data: { error: error.message },
        });
    });
});
