const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, commentController.createComment);
router.get("/thread/:id", auth, commentController.getCommentsByThreadId);
router.get("/post/:postId", auth, commentController.getCommentsByPostId);
router.get("/:id", auth, commentController.getCommentById);
router.put("/:id", auth, commentController.updateComment);
router.delete("/:id", auth, commentController.deleteComment);

module.exports = router;
