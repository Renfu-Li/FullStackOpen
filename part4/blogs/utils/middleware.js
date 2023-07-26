const { error } = require("./logger");

const unknownEndpoint = (res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res) => {
  error(err.message);
  res.status(500).json({ error: err.message });
};

module.exports = { unknownEndpoint, errorHandler };
