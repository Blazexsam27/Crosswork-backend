const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

const messageController = require("../controllers/message.controller");

router.get("/:roomId", auth, messageController.getMessagesByRoomId);
router.post("/save-message", auth, messageController.getMessagesByRoomId);
