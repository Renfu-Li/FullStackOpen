const express = require("express");
const cors = require("cors");
require("express-async-errors");
const mongoose = require("mongoose");
const { url } = require("./utils/config");
const { info, error } = require("./utils/logger");
const {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
} = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

mongoose
  .connect(url)
  .then(() => {
    info("Connecting to MongoDB");
  })
  .catch((err) => {
    error("Error connecting to MongoDB", err.message);
  });

mongoose.set("strictQuery", false);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/blogs", tokenExtractor, userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
