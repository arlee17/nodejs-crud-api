## Cookbook recipes API with MongoDB

The current version of the API (v3) uses a MongoDB database for data storage.

To connect to your database make sure you have all the necessary permissions and create en `.env` file in the root directory. There is an example in the file example.env.txt

## Installation

To install the API, you must have Node.js installed on your system. Then, follow these steps:

- Clone this repository to your local machine.
- Navigate to the project_directory/src/v3 in your terminal.
- Create your .env file.
- Run `npm install` to install the project dependencies.
- Run `npm run dev` to start the API in development mode.

> Note: Depending on your system you may need to make further adjustments.
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

The API has its own documentation which can be found, after launching the server, at localhost:3000/api/v3/docs.
