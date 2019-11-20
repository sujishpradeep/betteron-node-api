const mongoose = require("mongoose");
const Joi = require("joi");

const topicSchema = new mongoose.Schema({
  topicshort: { type: String, required: true },
  topicname: { type: String, required: true }
});

const Account = mongoose.model("Topic", topicSchema);

function validateAccount(account) {
  schema = {
    topicshort: Joi.string().required(),
    topicname: Joi.string().required()
  };

  return Joi.validate(account, schema);
}

exports.validate = validateAccount;

exports.Account = Account;
