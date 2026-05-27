export const errorHandler = (err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  
  // Distinguish between different error types if necessary
  const status = err.status || 500;
  const message = err.message || "An unexpected error occurred. Please try again later.";
  
  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
