const express = require("express");
const router = express.Router();
const { Feedback } = require("../models/feedback");
const _ = require("lodash");

//GET ALL
router.get("/", async (req, res) => {
  const feedbacks = await Feedback.find();
  res.send(feedbacks);
});

//POSTS
router.post("/", async (req, res) => {
  feedback = new Feedback({
    name: req.body.name,
    type: req.body.type,
    message: req.body.message,
    email: req.body.email
  });

  try {
    feedback = await feedback.save();
    res.send(feedback);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});
router.delete("/:id", async (req, res) => {
  const feedback = await Feedback.findByIdAndRemove(req.params.id);

  if (!feedback)
    return res
      .status(404)
      .send("The feedback with the given ID was not found.");

  res.send(feedback);
});

module.exports = router;
