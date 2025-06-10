const express = require("express");
const {
  getUser,
  updateUser,
  getAllUsers,
  getAllConnections,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/get-user/:id", auth, getUser);
router.get("/get-all-users", auth, getAllUsers);
router.get("/get-all-connections/:id", auth, getAllConnections);
router.put("/update-user", auth, updateUser);

module.exports = router;
