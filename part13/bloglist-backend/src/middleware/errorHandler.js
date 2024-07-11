const errorHandler = (err, req, res, next) => {
  console.error(err);

  // catch thrown errors

  if (err.name === 'SequelizeDatabaseError') {
    return res.status(500).send({ error: 'database error' });
  } else if (err.name === 'SequelizeValidationError') {
    return res
      .status(400)
      .send({ error: err.errors.map((item) => item.message) });
  }

  next();
};

module.exports = errorHandler;
