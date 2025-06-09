const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");

const privateMessageController = require("../controllers/privateMessage.controller");

router.get(
  "/:senderId/:receiverId",
  auth,
  privateMessageController.getMessages
);

module.exports = router;
