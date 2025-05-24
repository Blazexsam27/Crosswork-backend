const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room.controller");

// POST /api/rooms
router.post("/", auth, roomController.createRoom);

// GET /api/rooms/:id
router.get("/:id", auth, roomController.getRoomById);

module.exports = router;
