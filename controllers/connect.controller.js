const connectService = require("../services/connect.service");

exports.sendConnectionRequest = async (req, res) => {
  try {
    const result = await connectService.sendConnectionRequest(
      req.query.senderId,
      req.query.targetId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.acceptConnectionRequest = async (req, res) => {
  try {
    const result = await connectService.acceptConnectionRequest(
      req.query.senderId,
      req.query.targetId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.disconnect = async (req, res) => {
  try {
    const result = await connectService.disconnect(
      req.query.senderId,
      req.query.targetId
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
