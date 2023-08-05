require("dotenv").config();

const url =
  process.env.NODE_ENV !== "test"
    ? process.env.MONGODB_URI
    : process.env.TEST_MONGODB_URI;
const PORT = process.env.PORT;

module.exports = { url, PORT };
