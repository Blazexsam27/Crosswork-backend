const mongoose = require("mongoose");

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isVideoEnabled: { type: Boolean, default: false },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("Room", roomSchema);
