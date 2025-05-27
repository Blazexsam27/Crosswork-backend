require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const passport = require("passport");
require("./config/passport.config");

// Routes Imports
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const roomRoutes = require("./routes/room.routes");
const messageRoutes = require("./routes/message.routes");
const notificationRoutes = require("./routes/notification.routes");

const app = express();
const server = http.createServer(app); // Create HTTP server from app
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow frontend origins or restrict as needed
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);

// Database
const connectDB = require("./db");

// Socket logic (e.g., chat, video signaling)
require("./sockets/room.socket")(io);

// Start server
async function startServer() {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

// Only run if this file is executed directly
if (require.main === module) {
  startServer();
}

module.exports = { app, server, io }; // export for testing or reuse
