const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "token expired" });
  } else {
    next(err);
  }
};

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

module.exports = { errorHandler, unknownEndpoint };
