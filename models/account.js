const mongoose = require("mongoose");
const Joi = require("joi");

const accountSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  userid: { type: String, required: true },
  upvotes: [String]
});

const Account = mongoose.model("account", accountSchema);

function validateAccount(account) {
  schema = {
    userid: Joi.string().required(),
    fullname: Joi.string().required(),
    upvotes: Joi.array().optional()
  };

  return Joi.validate(account, schema);
}

exports.validate = validateAccount;

exports.Account = Account;
