# Recipe book api

## Introduction

This is a Node.js API that provides endpoints for creating, reading, updating and deleting recipes.

## Installation

To install the API, you must have Node.js installed on your system. Then, follow these steps:

- Clone this repository to your local machine.
- Navigate to the project directory in your terminal.
- Run `npm install` to install the project dependencies.
- Run `npm run dev` to start the API in development mode.

## Endpoints

The API provides the following endpoints:

| Method | Endpoint | Description |
| ------ | ------ | ------ |
| GET | /recipes| Returns all recipes.
| GET | /recipes/:id | Returns the recipe with the specified ID.
| POST | /recipes | Creates a new recipe.
| PATCH |/recipes/:id | Updates the recipe with the specified ID.
| DELETE | /recipes/:id | Deletes the recipe with the specified ID.

## Data Storage

The current version of the API (v1) uses a JSON file as the database. The file is located at `database/db.json`.


#### Future Versions

Future versions of the API are planned to include:

- Version 2: Uses a mySQL database for data storage.
- Version 3: Uses a MongoDB database for data storage.
