const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.controller");
const voteController = require("../controllers/vote.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, postsController.createPost);
router.get("/all", auth, postsController.getAllPosts);
router.get("/search", auth, postsController.searchPosts);
router.get(
  "/community/:communityId",
  auth,
  postsController.getPostsByCommunity
);
router.get("/user/:userId", auth, postsController.getPostsByUser);
router.get("/:postId", auth, postsController.getPostById);
router.put("/:postId", auth, postsController.updatePost);
router.delete("/:postId", auth, postsController.deletePost);

// Vote routes
router.post("/:postId/vote", auth, voteController.votePost);
router.get("/:postId/vote", auth, voteController.getUserVoteForPost);
router.post("/votes/bulk", auth, voteController.getUserVotesForPosts);

module.exports = router;
