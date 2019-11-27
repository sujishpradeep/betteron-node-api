const mongoose = require("mongoose");
const Joi = require("joi");

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  ioslink: { type: String, required: false },
  gplaylink: { type: String, required: false },
  type: { type: String, required: true },
  pricing: { type: String, required: true },
  appstore: { type: String, required: false },
  upvotes: { type: Number, required: true },
  tags: [String],
  isApproved: { type: String, required: true },
  description: String
});

const Resource = mongoose.model("Resource", resourceSchema);

function validateResource(resource) {
  schema = {
    name: Joi.string().required(),
    url: Joi.string().required(),
    type: Joi.string().required(),
    pricing: Joi.string().required(),
    appstore: Joi.string().optional(),
    ioslink: Joi.string().optional(),
    gplaylink: Joi.string().optional(),
    upvotes: Joi.string().required(),
    isApproved: Joi.string().required(),
    tags: Joi.array().optional(),
    description: Joi.string().optional()
  };

  return Joi.validate(resource, schema);
}

exports.validate = validateResource;

exports.Resource = Resource;
