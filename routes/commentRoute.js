const express = require('express');
const commentController = require('../controller/commentController');

const router = express.Router();

router.post('/create', commentController.createComment);
router.get('/', commentController.getCommentByRecipeId);
// router.get('/', commentController.getAllComments);


module.exports = router;