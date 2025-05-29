const socketAuth = require("../middlewares/socketAuth.middleware");
const roomService = require("../services/room.service");
const messageService = require("../services/message.service");
const Joi = require("joi");

const sendMessageSchema = Joi.object({
  roomId: Joi.string().length(24).hex().required(),
  message: Joi.string().min(1).max(550).required(),
});

const messageLimit = new Map();

module.exports = (io) => {
  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("Socket Connected ...", socket.id);

    socket.joinedRooms = new Set();

    socket.on("join-room", async ({ roomId }) => {
      const uid = socket.user.id.toString();
      socket.join(roomId);
      socket.joinedRooms.add(roomId);

      const updatedRoom = await roomService.addParticipant(roomId, uid);

      io.to(roomId).emit("user-joined", {
        userId: uid,
        participant: updatedRoom.participants,
      });
    });

    socket.on("send-message", async ({ roomId, message }) => {
      try {
        const uid = socket.user.id.toString();
        const now = Date.now();

        if (!messageLimit.has(uid)) {
          messageLimit.set(uid, []);
        }

        const timestamps = messageLimit
          .get(uid)
          .filter((ts) => now - ts < 60000);
        if (timestamps.length >= 20) {
          socket.emit("error", {
            message: "Rate limit exceeded. Please wait.",
          });
          return;
        }

        timestamps.push(now);
        messageLimit.set(uid, timestamps);

        const { error } = sendMessageSchema.validate({ roomId, message });
        if (error) {
          socket.emit("error", { message: error.details[0].message });
          return;
        }

        await messageService.saveMessage({
          roomId,
          senderId: uid,
          content: message,
        });

        io.to(roomId).emit("receive-message", { userId: uid, message });
      } catch (error) {
        console.error("Error handling send-message:", error);
      }
    });

    socket.on("leave-room", async ({ roomId }) => {
      try {
        const uid = socket.user?._id?.toString();
        await roomService.removeParticipant(roomId, uid);
        socket.leave(roomId);
        socket.joinedRooms.delete(roomId);
        socket.to(roomId).emit("user-left", { userId: uid });

        // delete the room record from mongo if there are no participants

        console.log(`${uid} left room ${roomId}`);
      } catch (error) {
        console.error("Leave room error: ", error);
      }
    });

    // WebRTC events...

    socket.on("disconnect", async () => {
      try {
        const uid = socket.user.id.toString();

        for (const roomId of socket.joinedRooms) {
          await roomService.removeParticipant(roomId, uid);
          socket.to(roomId).emit("user-left", { userId: uid });

          const participants = await roomService
            .getRoomById(roomId)
            .then((room) => room.participants);

          if (participants.length === 0) {
            await roomService.deleteRoomById(roomId);
            console.log(`Deleted empty room ${roomId}`);
          }
        }
      } catch (error) {
        console.error("Disconnect cleanup error:", error);
      }
    });
  });
};
