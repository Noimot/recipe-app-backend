const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "comment is required"],
    },
    userId:{
        type: String,
        required: [true, "user id is required"],
      },   
    recipeId:{
        type: String,
        required: [true, "recipe id is required"],
      },   
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
commentSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
