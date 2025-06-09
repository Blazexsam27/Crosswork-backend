const PrivateMessage = require("../models/privateMessage.model");

exports.getMessages = async (senderId, receiverId) => {
  try {
    const messages = await PrivateMessage.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { receiver: senderId, sender: receiverId },
      ],
    });
    return messages;
  } catch (error) {
    throw new Error(error);
  }
};

exports.createMessage = async (message) => {
  try {
    return await PrivateMessage.create(message);
  } catch (error) {
    throw new Error(error);
  }
};
