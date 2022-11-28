require('dotenv').config();
const express = require('express');
const api = express();
const usersHandler = require('./handlers/user');
const recipesHandler = require('./handlers/recipe')
const { expressjwt: jwt } = require('express-jwt');
const db = require('./pkg/db/db');

db.init();

api.use(express.json());
api.use(jwt({
  algorithms: ['HS256'],
  secret: process.env.JWT_SECRET
}).unless({
  path: [
    '/users/create-account',
    '/users/login',
  ]
}));

// users routes
api.post('/users/create-account', usersHandler.createAccount);
api.get('/users', usersHandler.getAllUsers);
api.post('/users/login', usersHandler.loginUser);
api.delete('/users/user/:id', usersHandler.deleteUser);

// recipes api
api.get('/recipes', recipesHandler.getAllRecipes);
api.post('/recipes/recipe', recipesHandler.createRecipe);
api.get('/recipes/recipe/:id', recipesHandler.getRecipe);
api.put('/recipes/recipe/:id', recipesHandler.updateRecipe);
api.delete('/recipes/recipe/:id', recipesHandler.deleteRecipe);

api.listen(process.env.PORT, err => {
  if (err) return console.log(`Not connected to the server`, err);
  return console.log(`Successfully connected to the server on port ${process.env.PORT}`);
});