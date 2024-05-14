// server/middleware/errorMiddleware.js

const handleErrors = (err, req, res, next) => {
  console.error(err.stack);

  // Check if the error is a known error type with a specific status code
  if (err.status) {
    res.status(err.status).json({ error: err.message });
  } else {
    // If the error is not a known type, send a generic 500 Internal Server Error response
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { handleErrors };
