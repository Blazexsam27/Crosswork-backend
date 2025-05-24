const express = require("express");
const { getUser, updateUser } = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/get-user", auth, getUser);
router.put("/update-user", auth, updateUser);

module.exports = router;
