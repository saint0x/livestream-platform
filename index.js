// index.js

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./server/config/routes");
const { handleErrors } = require("./server/middleware/errorMiddleware");

// Initialize Express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIo(server);

// Socket.IO configuration
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle joining a stream
  socket.on("joinStream", (streamId) => {
    socket.join(streamId);
    console.log(`User joined stream: ${streamId}`);
  });

  // Handle leaving a stream
  socket.on("leaveStream", (streamId) => {
    socket.leave(streamId);
    console.log(`User left stream: ${streamId}`);
  });

  // Handle posting a comment
  socket.on("postComment", (streamId, comment) => {
    io.to(streamId).emit("newComment", comment);
    console.log(`New comment posted on stream ${streamId}: ${comment}`);
  });

  // Handle liking a comment
  socket.on("likeComment", (streamId, commentId) => {
    io.to(streamId).emit("likedComment", commentId);
    console.log(`Comment liked on stream ${streamId}: ${commentId}`);
  });

  // Handle other websocket events as needed
});

// Middleware setup
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/live_stream_app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes setup
app.use("/", routes);

// Error handling middleware
app.use(handleErrors);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
