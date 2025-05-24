const Room = require("../models/room.model");

exports.createRoom = async (name, isVideoEnabled) => {
  const room = new Room({ name, isVideoEnabled });
  return await room.save();
};

exports.getRoomById = async (roomId) => {
  return await Room.findById(roomId).populate("participants", "name email");
};

exports.deleteRoomById = async (roomId) => {
  return await Room.deleteOne({ _id: roomId });
};

exports.addParticipant = async (roomId, userId) => {
  return await Room.findByIdAndUpdate(
    roomId,
    { $addToSet: { participants: userId } },
    { new: true }
  ).populate("participants", "name email");
};

exports.removeParticipant = async (roomId, userId) => {
  return await Room.findByIdAndUpdate(
    roomId,
    { $pull: { participants: userId } },
    { new: true }
  ).populate("participants", "name email");
};
