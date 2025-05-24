const roomService = require("../services/room.service");

exports.createRoom = async (req, res) => {
  try {
    const { name, isVideoEnabled } = req.body;
    const room = await roomService.createRoom(name, isVideoEnabled);

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await roomService.getRoomById(id);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
