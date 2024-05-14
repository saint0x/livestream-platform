// server/models/Stream.js

const mongoose = require('mongoose');

const streamSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  viewers: { type: Number, default: 0 }, // Viewer count
  // Add more fields as needed
});

const Stream = mongoose.model('Stream', streamSchema);

module.exports = Stream;
