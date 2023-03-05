## Cookbook recipes API with json database

The current version of the API (v1) uses a JSON file as the database. The file is database/db.json.

The API can connect to a real database with the relevant changes.

## Installation

To install the API, you must have Node.js installed on your system. Then, follow these steps:

- Clone this repository to your local machine.
- Navigate to the project_directory/src/v1 in your terminal.
- Run `npm install` to install the project dependencies.
- Run `npm run dev` to start the API in development mode.

## Endpoints

By default the chosen port is 3000 but you can change it to whatever you want.

The API provides the following endpoints:

| Method | Endpoint | Description |
| ------ | ------ | ------ |
| GET | /recipes| Returns all recipes.
| GET | /recipes/:id | Returns the recipe with the specified ID.
| POST | /recipes | Creates a new recipe.
| PATCH |/recipes/:id | Updates the recipe with the specified ID.
| DELETE | /recipes/:id | Deletes the recipe with the specified ID.


## Testing

To test the project run the command `npm test`.


## Documentation

The API has its own documentation which can be found, after launching the server, at localhost:3000/api/v1/docs.


