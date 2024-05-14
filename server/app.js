// server/app.js

const express = require('express');
const app = express();

// Middleware setup
app.use(express.json());

// Routes setup
const routes = require('./config/routes');
app.use('/api', routes);

module.exports = app;
