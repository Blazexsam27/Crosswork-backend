const Room = require("../models/room.model");

exports.createRoom = async (name, isVideoEnabled, host) => {
  const room = new Room({ name, isVideoEnabled, host });
  return await room.save();
};

exports.getRoomById = async (roomId) => {
  return await Room.findById(roomId);
};

exports.getAllParticipants = async (roomId) => {
  const data = await Room.findById(roomId).populate("participants");
  console.dir(data);
  return data;
};

exports.deleteRoomById = async (roomId) => {
  return await Room.deleteOne({ _id: roomId });
};

exports.addParticipant = async (roomId, userData) => {
  const room = await Room.findById(roomId);
  if (!room) throw new Error("Room not found");

  const updatedParticipants = room.participants.filter(
    (p) => p.userId.toString() !== userData.userId
  );
  updatedParticipants.push(userData);

  room.participants = updatedParticipants;
  await room.save();

  return room;
};

exports.removeParticipant = async (roomId, userId) => {
  const room = await Room.findById(roomId);
  if (!room) throw new Error("Room not found");

  const updatedParticipants = room.participants.filter(
    (p) => p.userId.toString() !== userId
  );

  room.participants = updatedParticipants;
  await room.save();

  return room;
};
