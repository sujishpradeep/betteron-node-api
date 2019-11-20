const express = require("express");
const topics = require("../routes/topics");
const tags = require("../routes/tags");

const cors = require("cors");
const error = require("../middleware/error");
const path = require("path");

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, `client/build`)));

  app.use("/api/topics", topics);
  app.use("/api/tags", tags);
  app.use(error);
};
