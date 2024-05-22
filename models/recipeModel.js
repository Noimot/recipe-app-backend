const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A recipe must have a name"],
    },
    ingredients: {
      type: String,
      required: [true, "A recipe must have ingredients"],
    },
    servings: {
      type: String,
    },
    instructions: {
      type: String,
      required: [true, "A recipe must have instructions"],
    },
    category: {
      type: String,
    },
    photo: String,
    prepTime: String,
    cookTime: String,
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
recipeSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

recipeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
