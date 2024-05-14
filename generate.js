// generateJWT.js

const jwt = require('jsonwebtoken');

// Generate a random payload (you can customize this)
const payload = {
  userId: Math.floor(Math.random() * 1000), // Random user ID
  username: 'example_user', // Example username
};

// Generate JWT token with a random secret (you can customize this)
const secret = Math.random().toString(36).substring(7); // Random secret
const token = jwt.sign(payload, secret);

console.log('Generated JWT token:', token);
