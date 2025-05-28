const express = require("express");
const {
  getUser,
  updateUser,
  getAllUsers,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/get-user", auth, getUser);
router.get("/get-all-users", auth, getAllUsers);
router.put("/update-user", auth, updateUser);

module.exports = router;
