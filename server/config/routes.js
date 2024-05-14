// server/config/routes.js

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");
const authController = require("../controllers/authController");
const streamController = require("../controllers/streamController");

// Authentication routes
router.post(
  "/register",
  validationMiddleware.validateRegistration,
  authController.register,
);
router.post("/login", validationMiddleware.validateLogin, authController.login);

// Stream management routes
router.post(
  "/streams/create",
  authMiddleware.authenticateUser,
  streamController.createStream,
);
router.get("/streams/:id", streamController.getStream);

// Stream creation route
router.post(
  "/stream",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").optional(),
  ],
  authMiddleware.authenticateUser, // Middleware to authenticate user
  validationMiddleware.handleValidationErrors, // Error handler for validation
  (req, res, next) => {
    // Route handler function
    try {
      // Ensure user is authenticated before proceeding
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Extract data from request body
      const { title, description } = req.body;

      // Your logic to create a new stream
      const newStream = new Stream({
        title,
        description,
        // Add any additional fields you want to save
      });

      // Save the stream to the database
      newStream
        .save()
        .then((savedStream) => {
          // Respond with success message
          res
            .status(201)
            .json({
              message: "Stream created successfully",
              stream: savedStream,
            });
        })
        .catch((error) => {
          console.error("Error creating stream:", error);
          res.status(500).json({ message: "Internal server error" });
        });
    } catch (error) {
      console.error("Error in stream creation route:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

module.exports = router;
