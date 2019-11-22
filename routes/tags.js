const express = require("express");
const router = express.Router();
const { Tag } = require("../models/tag");

var ObjectId = require("mongoose").Types.ObjectId;
//GET ALL
router.get("/", async (req, res) => {
  const Tags = await Tag.find();
  res.send(Tags);
});

//POSTS
router.post("/", async (req, res) => {
  // const { error } = validate(req.body);
  //If invalid, return 400 - Bad request
  // if (error) return res.status(400).send(error.details[0].message);

  const short = req.body.name
    .toLowerCase()
    .trim()
    .replace(" ", "-");

  const name = req.body.name.replace(/\b\w/g, l => l.toUpperCase());

  tag = new Tag({
    name: name,
    short: short,
    popular: req.body.popular
  });

  try {
    tag = await tag.save();
    res.send(tag);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const tag = await Tag.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );

  if (!tag)
    return res.status(404).send("The tag with the given ID was not found.");

  res.send(tag);
});

router.delete("/:id", async (req, res) => {
  const tag = await Tag.deleteOne({ short: req.params.id });

  if (!tag)
    return res.status(404).send("The tag with the given ID was not found.");

  res.send(tag);
});

module.exports = router;
