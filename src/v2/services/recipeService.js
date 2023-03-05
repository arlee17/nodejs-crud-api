const db = require('../database/dbService');
const DB_TABLE_NAME = 'recipes';

async function getAllRecipes() {
    try {
        const sql = `SELECT * FROM ${DB_TABLE_NAME}`;
        const result = await db.query(sql);
        if (!result || !result.length) {
            throw new Error('No recipes found');
        }
        const recipes = result.map(row => ({
            id: row.id,
            name: row.name,
            type: row.type,
            description: row.description,
            ingredients: JSON.parse(row.ingredients),
            instructions: JSON.parse(row.instructions),
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        }));
        return { data: recipes };
    } catch (error) {
        throw new Error(`Error while getting recipes: ${error.message}`);
    }
}

async function getOneRecipe(id) {
    try {
        const sql = `SELECT * FROM ${DB_TABLE_NAME} WHERE id = ${id}`;
        const result = await db.query(sql);
        if (!result || !result.length) {
            throw new Error(`Error while getting recipe with id ${id}`);
        }
        const recipe = result.map(row => ({
            id: row.id,
            name: row.name,
            type: row.type,
            description: row.description,
            ingredients: JSON.parse(row.ingredients),
            instructions: JSON.parse(row.instructions),
            createdAt: row.created_at,
            updatedAt: row.updated_at,
        }));
        return { data: recipe };
    } catch (error) {
        throw new Error(`Error while getting recipe with id ${id}: ${error}`);
    }
}


async function createOneRecipe(recipe) {
    const sql = `
      INSERT INTO ${DB_TABLE_NAME} (name, type, description, ingredients, instructions)
      VALUES (?, ?, ?, ?, ?)
    `;
    const { name, type, description, ingredients, instructions } = recipe;
    const params = [name, type, description, ingredients, instructions];
    try {
        const { affectedRows } = await db.query(sql, params);
        if (affectedRows === 1) {
            return { message: 'Recipe successfully created' };
        } else {
            throw new Error('Error while creating recipe');
        }
    } catch (error) {
        throw new Error(`Error while creating recipe: ${error.message}`);
    }
}

async function updateOneRecipe(id, recipe) {
    const { name, type, description, ingredients, instructions } = recipe;

    try {
        const sql = `
        UPDATE ${DB_TABLE_NAME}
        SET name=?, type=?, description=?, ingredients=?, instructions=?
        WHERE id=? `;
        const body = [name, type, description, JSON.stringify(ingredients), JSON.stringify(instructions), id];
        const { affectedRows } = await db.query(sql, body);
        if (affectedRows === 1) {
            return { message: 'Recipe successfully updated' };
        }
        throw new Error('Error in updating recipe');
    } catch (error) {
        throw new Error(`Error while updating recipe: ${error.message}`);
    }
}

async function deleteOneRecipe(id) {
    try {
        const sql = `DELETE FROM ${DB_TABLE_NAME} WHERE id=?`;
        const { affectedRows } = await db.query(sql, [id]);
        if (affectedRows === 1) {
            return { message: 'Recipe successfully deleted' };
        }
        throw new Error('Error in deleting recipe');
    } catch (error) {
        throw new Error(`Error while deleting recipe: ${error.message}`);
    }
}

module.exports = {
    getAllRecipes,
    getOneRecipe,
    createOneRecipe,
    updateOneRecipe,
    deleteOneRecipe
};
