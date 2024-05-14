// server/services/authService.js

const bcrypt = require('bcryptjs');
const User = require('../models/User');

const authService = {
  registerUser: async (userData) => {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new Error('Failed to register user');
    }
  },

  loginUser: async (email, password) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return null;

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) return null;

      return user;
    } catch (error) {
      throw new Error('Failed to login user');
    }
  },
};

module.exports = authService;
