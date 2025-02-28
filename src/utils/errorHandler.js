const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "An unexpected error occurred" });
};

module.exports = errorHandler;
