const express = require("express");
const recipeController = require("../controller/recipeController");

const router = express.Router();

router.post("/create", recipeController.createRecipe);
router.put("/:id", recipeController.updateRecipe);
router.delete("/:id", recipeController.deleteRecipe);
router.get("/:id", recipeController.getRecipeById);
router.get("/", recipeController.searchRecipe);
// router.get("/", recipeController.getAllRecipes);



module.exports = router;
