const auth = require("../middlewares/auth.middleware");
const {
  sendConnectionRequest,
  acceptConnectionRequest,
  disconnect,
} = require("../controllers/connect.controller");

const express = require("express");
const router = express.Router();

// handle connections
router.post("/", auth, sendConnectionRequest);
router.post("/accept", auth, acceptConnectionRequest);
router.post("/decline", auth, acceptConnectionRequest);
router.post("/disconnect", auth, disconnect);

module.exports = router;
