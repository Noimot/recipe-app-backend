const express = require('express');
const recipeController = require('../controller/recipeController');

const router = express.Router();

router.post('/create', recipeController.createRecipe);
router.get('/:id', recipeController.getRecipeById);
router.get('/', recipeController.getAllRecipes);


module.exports = router;