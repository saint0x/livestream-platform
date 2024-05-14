// server/controllers/streamController.js

const { spawn } = require('child_process');
const Stream = require('../models/Stream');
const streamService = require('../services/streamService');

const streamController = {
  
  createStream: async (req, res) => {
    try {
      const { title, description } = req.body;

      // Create stream
      const stream = await streamService.createStream({
        title,
        description,
        userId: req.user._id, // Assuming user is authenticated
      });

      // Start VP9 encoding process using FFmpeg
      const ffmpeg = spawn('ffmpeg', [
        '-i', 'input_stream_source', // Replace 'input_stream_source' with actual input source (e.g., video/audio feed)
        '-c:v', 'libvpx-vp9', // Use libvpx-vp9 codec for VP9 encoding
        '-b:v', '1M', // Set target bitrate for video (adjust as needed)
        '-f', 'webm', // Output format (WebM)
        '-',
      ]);

      // Handle FFmpeg output data
      ffmpeg.stdout.on('data', (data) => {
        console.log(`FFmpeg stdout: ${data}`);
      });

      ffmpeg.stderr.on('data', (data) => {
        console.error(`FFmpeg stderr: ${data}`);
      });

      ffmpeg.on('close', (code) => {
        console.log(`FFmpeg process exited with code ${code}`);
      });

      // Handle FFmpeg errors
      ffmpeg.on('error', (error) => {
        console.error('FFmpeg error:', error.message);
      });

      res.status(201).json({ stream });
    } catch (error) {
      console.error('Error creating stream:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getStream: async (req, res) => {
    try {
      const streamId = req.params.id;

      // Retrieve stream by ID
      const stream = await streamService.getStreamById(streamId);
      if (!stream) {
        return res.status(404).json({ error: 'Stream not found' });
      }

      res.status(200).json({ stream });
    } catch (error) {
      console.error('Error getting stream:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  joinStream: async (req, res) => {
    try {
      const streamId = req.params.id;

      // Increment viewer count
      await Stream.findByIdAndUpdate(streamId, { $inc: { viewers: 1 } });

      res.status(200).json({ message: 'Joined stream successfully' });
    } catch (error) {
      console.error('Error joining stream:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  leaveStream: async (req, res) => {
    try {
      const streamId = req.params.id;

      // Decrement viewer count
      await Stream.findByIdAndUpdate(streamId, { $inc: { viewers: -1 } });

      res.status(200).json({ message: 'Left stream successfully' });
    } catch (error) {
      console.error('Error leaving stream:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  likeStream: async (req, res) => {
    try {
      const streamId = req.params.id;

      // Increment likes count for the stream
      await Stream.findByIdAndUpdate(streamId, { $inc: { likes: 1 } });

      res.status(200).json({ message: 'Liked stream successfully' });
    } catch (error) {
      console.error('Error liking stream:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  postComment: async (req, res) => {
    try {
      const streamId = req.params.id;
      const { userId, text } = req.body;

      // Add the comment to the stream
      await Stream.findByIdAndUpdate(streamId, { $push: { comments: { userId, text } } });

      res.status(200).json({ message: 'Comment posted successfully' });
    } catch (error) {
      console.error('Error posting comment:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  likeComment: async (req, res) => {
    try {
      const streamId = req.params.streamId;
      const commentId = req.params.commentId;

      // Increment likes count for the comment
      await Stream.findOneAndUpdate(
        { _id: streamId, 'comments._id': commentId },
        { $inc: { 'comments.$.likes': 1 } }
      );

      res.status(200).json({ message: 'Liked comment successfully' });
    } catch (error) {
      console.error('Error liking comment:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  replyToComment: async (req, res) => {
    try {
      const streamId = req.params.streamId;
      const commentId = req.params.commentId;
      const { userId, text } = req.body;

      // Add the reply to the comment
      await Stream.findOneAndUpdate(
        { _id: streamId, 'comments._id': commentId },
        { $push: { 'comments.$.replies': { userId, text } } }
      );

      res.status(200).json({ message: 'Replied to comment successfully' });
    } catch (error) {
      console.error('Error replying to comment:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = streamController;
