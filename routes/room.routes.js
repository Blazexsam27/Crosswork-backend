const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room.controller");
const auth = require("../middlewares/auth.middleware");

// POST /api/rooms
router.post("/", auth, roomController.createRoom);

// GET /api/rooms/:id
router.get("/:id", auth, roomController.getRoomById);

module.exports = router;
