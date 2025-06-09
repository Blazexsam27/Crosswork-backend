const socketAuth = require("../middlewares/socketAuth.middleware");
const roomService = require("../services/room.service");
const messageService = require("../services/message.service");
const PrivateMessage = require("../models/privateMessage.model");
const Joi = require("joi");

const sendMessageSchema = Joi.object({
  roomId: Joi.string().length(24).hex().required(),
  message: Joi.string().min(1).max(550).required(),
});

const messageLimit = new Map();

// Add this helper function
async function scheduleRoomCleanup(roomId) {
  // Check after 5 minutes if room is still empty
  setTimeout(async () => {
    const room = await roomService.getRoomById(roomId);
    if (room && room.participants.length === 0) {
      await roomService.deleteRoomById(roomId);
      console.log(`Deleted empty room ${roomId} after delay`);
    }
  }, 60 * 1000); // 1 minute
}

module.exports = (io) => {
  io.use(socketAuth);

  io.on("connection", (socket) => {
    console.log("Socket Connected ...", socket.id);

    socket.joinedRooms = new Set();

    socket.on(
      "join-room",
      async ({ roomId, name, email, isVideoOn, isMuted }) => {
        const userId = socket.user.id;
        socket.join(roomId);
        socket.joinedRooms.add(roomId);

        const updatedRoom = await roomService.addParticipant(roomId, {
          userId,
          isVideoOn,
          isMuted,
          name,
          email,
        });

        io.to(roomId).emit("user-joined", {
          userId,
          participant: updatedRoom.participants,
        });
      }
    );

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
        const uid = socket.user?.id?.toString();
        await roomService.removeParticipant(roomId, uid);
        socket.leave(roomId);
        socket.joinedRooms.delete(roomId);
        socket.to(roomId).emit("user-left", { userId: uid });

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
            scheduleRoomCleanup(roomId);
            // await roomService.deleteRoomById(roomId);
          }
        }
      } catch (error) {
        console.error("Disconnect cleanup error:", error);
      }
    });
  });

  const chatNamespace = io.of("/chat");
  chatNamespace.on("connection", (socket) => {
    console.log("Messaging Socket Connected ...", socket.id);

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined a private chat room`);
    });

    socket.on("private-message", async ({ sender, receiver, content }) => {
      try {
        const message = new PrivateMessage({
          sender,
          receiver,
          content,
        });
        await message.save();

        console.log("Emitting now ----->>>");
        chatNamespace.to(sender).emit("private-message", message);
        chatNamespace.to(receiver).emit("private-message", message);

        // update the read status if receiver is online
        if (io.sockets.adapter.rooms.has(receiver)) {
          message.read = true;

          await message.save();

          io.to(receiver).emit("message-read", message._id);
        }
      } catch (error) {
        console.error("Error while sending message:", error);
      }
    });

    socket.on("mark-read", async (messageId) => {
      try {
        const message = await PrivateMessage.findByIdAndUpdate(
          messageId,
          { read: true },
          { new: true }
        );
        if (message) {
          io.to(message.sender.toString()).emit("message-read", messageId);
        }
      } catch (error) {
        console.error("Error marking message as read:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};
