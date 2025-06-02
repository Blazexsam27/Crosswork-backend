const mongoose = require("mongoose");

participantsSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  isVideoOn: { type: Boolean },
  isMuted: { type: Boolean },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const roomSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    host: {
      type: String,
      required: true,
    },
    participants: [participantsSchema],

    isVideoEnabled: { type: Boolean, default: false },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("Room", roomSchema);
