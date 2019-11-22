const express = require("express");
const resources = require("../routes/resources");
const tags = require("../routes/tags");

const cors = require("cors");
const error = require("../middleware/error");
const path = require("path");

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());
  app.use(express.static(path.join(__dirname, `client/build`)));

  app.use("/upstacks/resources", resources);
  app.use("/upstacks/tags", tags);
  app.use(error);
};
