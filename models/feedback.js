const mongoose = require("mongoose");
const Joi = require("joi");

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: false },
  type: { type: String, required: false }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

function validateFeedback(feedback) {
  schema = {
    name: Joi.string().required(),
    email: Joi.string().required(),
    message: Joi.string().required(),
    type: Joi.string().required()
  };

  return Joi.validate(feedback, schema);
}

exports.validate = validateFeedback;

exports.Feedback = Feedback;
