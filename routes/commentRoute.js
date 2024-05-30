const express = require("express");
const commentController = require("../controller/commentController");

const router = express.Router();

router.post("/create", commentController.createComment);
router.get("/:recipeId", commentController.getCommentByRecipeId);
router.get("/", commentController.getAllComments);
router.get("/:id", commentController.getCommentById);
router.put("/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

module.exports = router;
