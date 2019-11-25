const express = require("express");
const router = express.Router();
const { Account, validate } = require("../models/account");
var ObjectId = require("mongoose").Types.ObjectId;

//GET ALL
router.get("/", async (req, res) => {
  const Accounts = await Account.find();
  res.send(Accounts);
});

//Get Account by ID
router.get("/:id", async (req, res) => {
  try {
    let account = await Account.findById({
      _id: new ObjectId(req.params.id)
    });
    if (!account) return res.status(404).send("Account not found");

    res.send(account);
  } catch (error) {
    console.log("error", error);
  }
});

//Get Upvotes by ID
router.get("/upvotes/:id", async (req, res) => {
  try {
    let account = await Account.findOne({
      _id: new ObjectId(req.params.id)
    });
    res.send(account.upvotes);
  } catch (error) {
    console.log("error", error);
  }
});

//POSTS
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  //If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message);

  account = new Account({
    userid: req.body.userid,
    fullname: req.body.fullname,
    upvotes: []
  });

  try {
    account = await account.save();
    res.send(account);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

//Update Upvotes
router.put("/upvotes/:id", async (req, res) => {
  //If invalid, return 400 - Bad request
  if (!Array.isArray(req.body))
    return res.status(400).send("Upvotes must be an array");

  const upvotes = req.body;

  try {
    account = await Account.findOneAndUpdate(
      { _id: req.params.id },
      { upvotes: upvotes },
      { new: true }
    );

    //If invalid, return 400 - Bad request
    if (!account) return res.status(400).send("Account does not exist");

    res.send(account.upvotes);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

module.exports = router;
