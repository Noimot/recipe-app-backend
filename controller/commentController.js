const Comment = require('../models/commentModel');
const catchAsync = require('../utils/catchAsync')


  //Comment on recipe post
  exports.createComment = async (req, res) => {
    try {
        let { comment, userId, recipeId } = req.body
        const newComment = await Comment.create({ comment, userId, recipeId })

        res.status(201).json({
            status:'success',
            data: {
                Comment: newComment,
            },
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error,
        })
    }
}

exports.getAllComments = catchAsync(async (req, res, next) => {
    const allComments = await Comment.find()
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: allComments.length,
      data: {
        allComments,
      },
    })
  })

  exports.getCommentByRecipeId = async (req, res) => {
    const recipeId = req.params.recipeId;
    try {
        const comments = await Comment.find({ recipeId: recipeId });  
      res.status(200).json({
        status: "success",
        data: {
          comments,
        },
      });
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error,
      });
    }
  };
