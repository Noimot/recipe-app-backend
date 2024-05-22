const Comment = require("../models/commentModel");
const Recipe = require("../models/recipeModel");
const catchAsync = require("../utils/catchAsync");

exports.createRecipe = async (req, res) => {
  try {
    let { name, servings, instructions, ingredients, prepTime, cookTime } =
      req.body;
    const newRecipe = await Recipe.create({
      name,
      servings,
      instructions,
      ingredients,
      prepTime,
      cookTime,
    });

    res.status(201).json({
      status: "success",
      data: {
        Recipe: newRecipe,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        recipe,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getAllRecipes = catchAsync(async (req, res, next) => {
  const allRecipes = await Recipe.find();
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: allRecipes.length,
    data: {
      allRecipes,
    },
  });
});

exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        recipe,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
