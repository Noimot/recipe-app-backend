const express = require("express");
const recipeController = require("../controller/recipeController");
const upload = require('../utils/multer');

const router = express.Router();

router.post("/create", upload.single('photo'), recipeController.createRecipe);
router.put("/:id", upload.single('photo'), recipeController.updateRecipe);
router.delete("/:id", recipeController.deleteRecipe);
router.get("/:id", recipeController.getRecipeById);
router.get("/", recipeController.searchRecipe);
// router.get("/", recipeController.getAllRecipes);



module.exports = router;
