const express = require("express");
const router = express.Router();
const { Tag } = require("../models/tag");

var ObjectId = require("mongoose").Types.ObjectId;
//GET ALL
router.get("/", async (req, res) => {
  const Tags = await Tag.find();
  res.send(Tags);
});

module.exports = router;
