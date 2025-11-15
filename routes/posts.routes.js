const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, postsController.createPost);
router.get("/all", auth, postsController.getAllPosts);
router.get(
  "/community/:communityId",
  auth,
  postsController.getPostsByCommunity
);
router.get("/user/:userId", auth, postsController.getPostsByUser);
router.get("/:postId", auth, postsController.getPostById);
router.put("/:postId", auth, postsController.updatePost);
router.delete("/:postId", auth, postsController.deletePost);

module.exports = router;
