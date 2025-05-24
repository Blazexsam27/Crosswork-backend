const { io } = require("socket.io-client");
const { Types } = require("mongoose");

const socket = io("http://localhost:8080"); // Adjust if your backend uses a different port

const roomId = new Types.ObjectId();
const userId = "682cdfb297a85d1dd772784c";

socket.on("connect", () => {
  console.log("🟢 Connected to server:", socket.id);

  // Join the room
  socket.emit("join-room", { roomId, userId });
  console.log("📥 Emitted join-room");

  // Send a message to the room
  socket.emit("send-message", {
    roomId,
    userId,
    message: "Hello from test-socket.js!",
  });
  console.log("💬 Emitted send-message");
});

// Listen for confirmation or other events
socket.on("user-joined", (data) => {
  console.log("👥 user-joined event:", data);
});

socket.on("receive-message", (data) => {
  console.log("📨 receive-message event:", data);
});

socket.on("disconnect", () => {
  console.log("🔴 Disconnected from server");
});

socket.on("connect_error", (err) => {
  console.error("❌ Connection error:", err.message);
});
