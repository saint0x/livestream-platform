const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = {
  authenticateUser: async (req, res, next) => {
    try {
      console.log("Authenticating user...");
      const token = req.headers.authorization.split(' ')[1];
      console.log("Token:", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded:", decoded);
      const user = await User.findById(decoded.userId);
      console.log("User:", user);
      if (!user) {
        throw new Error('User not found');
      }
      req.user = user;
      console.log("Authentication successful!");
      next();
    } catch (error) {
      console.error('Authentication error:', error.message);
      res.status(401).json({ error: 'Unauthorized' });
    }
  },
};

module.exports = authMiddleware;
