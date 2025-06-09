exports.getMessages = async (userId, peerId) => {
  try {
    return await Message.find({ users: { $all: [userId, peerId] } });
  } catch (error) {
    throw new Error(error);
  }
};
