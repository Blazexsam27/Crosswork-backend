const express = require("express");
const router = express.Router();
const threadController = require("../controllers/thread.controller");
const auth = require("../middlewares/auth.middleware");

router.post("/", auth, threadController.createThread);
router.get("/all", auth, threadController.getAllThreads);
router.post("/category", auth, threadController.getThreadsByCategory);
router.post(
  "/category-and-user",
  auth,
  threadController.getThreadByCategoryAndUser
);
router.get("/:id", auth, threadController.getThreadById);
router.put("/:id", auth, threadController.updateThread);
router.delete("/:id", auth, threadController.deleteThread);

module.exports = router;
