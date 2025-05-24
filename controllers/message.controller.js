const messageService = require("../services/message.service");

exports.getRoomMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await messageService.getMessageByRoomId(roomId);

    res.status(201).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveMessage = async (req, res) => {
  try {
    const { roomId, senderId, content } = req.body;
    await messageService.saveMessage({ roomId, senderId, content });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
