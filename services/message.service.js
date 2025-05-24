const Message = require("../models/message.model");

exports.saveMessage = async ({ roomId, senderId, content }) => {
  const message = new Message({ roomId, senderId, content });
  return await message.save();
};

exports.getMessageByRoomId = async (roomId) => {
  return await Message.find({ roomId })
    .sort({ createdAt: 1 })
    .populate("senderId", "username email");
};
