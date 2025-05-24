const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    roomId: { type: mongoose.Types.ObjectId, required: true, ref: "Room" },
    senderId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    content: { type: String, required: true },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Message", messageSchema);
