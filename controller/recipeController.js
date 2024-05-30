const Comment = require("../models/commentModel");
const Recipe = require("../models/recipeModel");
const catchAsync = require("../utils/catchAsync");
const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary')

exports.createRecipe = async (req, res) => {
  try {
    let { name, servings, instructions, ingredients, prepTime, cookTime } =
      req.body;
      const photoUrl = req.file ? req.file.path : '';

    const newRecipe = await Recipe.create({
      name,
      servings,
      instructions,
      ingredients,
      prepTime,
      cookTime,
      photo: photoUrl
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
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      req.body.photo = result.secure_url;
    }

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

exports.searchRecipe = async (req, res) => {
  const { name } = req.query;

  try {
    const recipes = await Recipe.find({ name: new RegExp(name, "i") }); // Case-insensitive search
    res.status(200).json({
      status: "success",
      results: recipes.length,
      data: {
        recipes,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
