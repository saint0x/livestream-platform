// server/services/streamService.js

const Stream = require('../models/Stream');

const streamService = {
  createStream: async (streamData) => {
    try {
      const stream = new Stream(streamData);
      await stream.save();
      return stream;
    } catch (error) {
      throw new Error('Failed to create stream');
    }
  },

  getStreamById: async (streamId) => {
    try {
      const stream = await Stream.findById(streamId);
      return stream;
    } catch (error) {
      throw new Error('Failed to get stream by ID');
    }
  },
};

module.exports = streamService;
