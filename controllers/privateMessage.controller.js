const privateMessageService = require("../services/privateMessage.service");

exports.getMessages = async (req, res) => {
  try {
    const response = await privateMessageService.getMessages(
      req.params.senderId,
      req.params.receiverId
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
