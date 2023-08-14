const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const cors = require("cors");

const { url } = require("./utils/config");
const { errorHandler, unknownEndpoint } = require("./utils/middleware");
const { info, error } = require("./utils/logger");
const notesRouter = require("./controllers/notes");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const app = express();

mongoose
  .connect(url)
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((err) => error(err.message));

mongoose.set("strictPopulate", false);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use("/api/login", loginRouter);
app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
