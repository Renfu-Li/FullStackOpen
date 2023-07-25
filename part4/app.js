const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { url } = require("./utils/config");
const { info, error } = require("./utils/logger");
const { unknownEndpoint, errorHandler } = require("./utils/middleware");
const blogsRouter = require("./controllers/blogs");

mongoose
  .connect(url)
  .then(() => {
    info("Connecting to MongoDB");
  })
  .catch((err) => {
    error("Error connecting to MongoDB");
  });

mongoose.set("strictQuery", false);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
