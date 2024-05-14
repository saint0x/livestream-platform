const { body, validationResult } = require("express-validator");

// Validation middleware for handling validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Validation errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("Validation successful!");
  next();
};

// Validation rules for user registration
const validateRegistration = [
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  handleValidationErrors,
];

// Validation rules for user login
const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Invalid email address"),
  body("password").trim().notEmpty().withMessage("Password is required"),
  handleValidationErrors,
];

// Validation rules for creating a new stream
const validateCreateStream = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").optional().trim(),
  handleValidationErrors,
];

// Validation rules for posting a comment
const validatePostComment = [
  body("userId").trim().notEmpty().withMessage("User ID is required"),
  body("text").trim().notEmpty().withMessage("Comment text is required"),
  handleValidationErrors,
];

// Validation rules for liking a comment
const validateLikeComment = [
  body("streamId").trim().notEmpty().withMessage("Stream ID is required"),
  body("commentId").trim().notEmpty().withMessage("Comment ID is required"),
  handleValidationErrors,
];

// Validation rules for replying to a comment
const validateReplyToComment = [
  body("streamId").trim().notEmpty().withMessage("Stream ID is required"),
  body("commentId").trim().notEmpty().withMessage("Comment ID is required"),
  body("userId").trim().notEmpty().withMessage("User ID is required"),
  body("text").trim().notEmpty().withMessage("Reply text is required"),
  handleValidationErrors,
];

module.exports = {
  validateCreateStream,
  validatePostComment,
  validateLikeComment,
  validateReplyToComment,
  validateRegistration,
  validateLogin,
};
