## Cookbook recipes API with mySQL database

The current version of the API (v2) uses a mySQL database for data storage.

To connect to your database make sure you have all the necessary permissions and change the values in the database/dbConfig.js file.

I leave you the example SQL commands to create the necessary table and some test recipe in the database/commands_examples.txt file.

## Installation

To install the API, you must have Node.js installed on your system. Then, follow these steps:

- Clone this repository to your local machine.
- Navigate to the project_directory/src/v2 in your terminal.
- Run `npm install` to install the project dependencies.
- Make sure the values in the database/dbConfig.js file are set correctly.
- Run `npm run dev` to start the API in development mode.

## Endpoints

By default the chosen port is 3000 but you can change it to whatever you want.

The API provides the following endpoints:

| Method | Endpoint | Description |
| ------ | ------ | ------ |
| GET | /recipes| Returns all recipes.
| GET | /recipes/:id | Returns the recipe with the specified ID.
| POST | /recipes | Creates a new recipe.
| PUT |/recipes/:id | Updates the recipe with the specified ID.
| DELETE | /recipes/:id | Deletes the recipe with the specified ID.


## Testing

To test the project run the command `npm test`


## Documentation

The API has its own documentation which can be found, after launching the server, at localhost:3000/api/v2/docs.