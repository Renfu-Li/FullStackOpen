const jwt = require("jsonwebtoken");
const { error } = require("./logger");
const User = require("../models/user");

const unknownEndpoint = (req, res, next) => {
  res.status(404).json({ error: "unknown endpoint" });
  next();
};

const errorHandler = (err, req, res, next) => {
  if (
    (err.name === "ValidationError") &
    (err.message === "Title and URL are required")
  ) {
    return res.status(400).json(err.message);
  } else if (err.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "JsonTokenError") {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "Unauthorized") {
    return res.status(401).json({ error: err.message });
  } else if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "token expired" });
  } else {
    next(err);
  }

  error(err.message);
  res.status(500).json({ error: err.message });
};

const tokenExtractor = (req, res, next) => {
  if (req.method === "GET") {
    return next();
  }
  const authorization = req.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    req.token = authorization.replace("bearer ", "");
  }

  next();
};

const userExtractor = async (req, res, next) => {
  if (req.method === "GET") {
    return next();
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }

  req.user = await User.findById(decodedToken.id);
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
