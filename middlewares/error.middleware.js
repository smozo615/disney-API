const { ValidationError } = require('sequelize');

const logErrorMiddleware = function (err, req, res, next) {
  console.log(err);
  next(err);
};

const boomErrorMiddleware = function (err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
  }
  next(err);
};

const ormErrorMiddleware = function (err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
};

const errorMiddleware = function (err, req, res, next) {
  return res.status(500).json({ error: err.message });
};

module.exports = {
  logErrorMiddleware,
  boomErrorMiddleware,
  errorMiddleware,
  ormErrorMiddleware,
};
