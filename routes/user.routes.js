const express = require("express");
const {
  getUser,
  updateUser,
  getAllUsers,
  getAllConnections,
  joinCommunity,
  leaveCommunity,
  bookmarkPost,
  unbookmarkPost,
  getBookmarkedPosts,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/get-user", auth, getUser);
router.get("/get-all-users", auth, getAllUsers);
router.get("/get-all-connections/:id", auth, getAllConnections);
router.put("/update-user", auth, updateUser);
router.post("/join-community/:communityId", auth, joinCommunity);
router.post("/leave-community/:communityId", auth, leaveCommunity);
router.post("/bookmark/:postId", auth, bookmarkPost);
router.delete("/bookmark/:postId", auth, unbookmarkPost);
router.get("/bookmarks", auth, getBookmarkedPosts);

module.exports = router;
