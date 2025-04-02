const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT || 3000;
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

module.exports = { DB_URI, PORT, errorHandler };
