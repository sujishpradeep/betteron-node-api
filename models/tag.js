const mongoose = require("mongoose");
const Joi = require("joi");

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  short: { type: String, required: true },
  popular: { type: String, required: true }
});

const Tag = mongoose.model("Tag", tagSchema);

function validateTag(tag) {
  schema = {
    name: Joi.string().required(),
    popular: Joi.string().required(),
    short: Joi.string().required()
  };

  return Joi.validate(tag, schema);
}

exports.validate = validateTag;

exports.Tag = Tag;
