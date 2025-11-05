exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  // Basic error response; you can expand for validation
  res.status(err.statusCode || 500).json({
    message: err.message || 'Server Error'
  });
};
