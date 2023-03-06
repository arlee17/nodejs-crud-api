# Cookbook recipes APIs

## Introduction

This is a collection of two APIs developed with Node.js.

The user can create, read, update and delete cookbook recipes.

The projects are divided into their respective directories and can be used separately.

If you want to use them at the same time you have to change the port 3000 to one of the two to avoid conflicts.


## Installation

To install the APIs, you must have Node.js installed on your system. Then, follow these steps:

- Clone this repository to your local machine.
- Navigate to the project_directory/src/vX in your terminal.
- Run `npm install` to install the project dependencies.
- Run `npm run dev` to start the API in development mode.

> Note: These are the general steps, each version may require further adjustments.

## Endpoints

The APIs provides the following endpoints:

| Method | Endpoint | Description |
| ------ | ------ | ------ |
| GET | /recipes| Returns all recipes.
| GET | /recipes/:id | Returns the recipe with the specified ID.
| POST | /recipes | Creates a new recipe.
| PUT |/recipes/:id | Updates the recipe with the specified ID.
| DELETE | /recipes/:id | Deletes the recipe with the specified ID.

## Data Storage

- V1 (version 1) uses a JSON file as the database for data storage.
- V2 (version 2) uses a mySQL database for data storage.
- V3 (version 3) uses a MongoDB database for data storage.


## Testing

Each project has its own unit tests.


## Documentation

Each API has its own documentation.


> Note: I recommend using these APIs only for test or personal projects.