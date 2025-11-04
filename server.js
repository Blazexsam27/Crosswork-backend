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
const connectRoutes = require("./routes/connect.routes");
const recommendationRoutes = require("./routes/recommendation.routes");
const threadRoutes = require("./routes/thread.routes");
const commentRoutes = require("./routes/comment.routes");
const privateMessageRoutes = require("./routes/privateMessage.routes");
const communityRoutes = require("./routes/community.routes");

const app = express();
const server = http.createServer(app);

// Define allowed origins
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

const io = socketIo(server, {
  cors: {
    origin: allowedOrigins, // Specify explicit origins instead of "*"
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins, // Match Socket.IO CORS config
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/health", (req, res) => {
  res.send("Hi there! I'm healthy.");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/connect", connectRoutes);
app.use("/api/recommend", recommendationRoutes);
app.use("/api/threads", threadRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/private-messages", privateMessageRoutes);
app.use("/api/community", communityRoutes);

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

module.exports = { app, server, io };
