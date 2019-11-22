const express = require("express");
const router = express.Router();
const { Resource, validate } = require("../models/resource");
const { validate: validateRewards } = require("../models/reward");
const { validate: validateRedeems } = require("../models/redeem");
var ObjectId = require("mongoose").Types.ObjectId;

//GET ALL
router.get("/", async (req, res) => {
  const Resources = await Resource.find();
  res.send(Resources);
});

//Get Resource by ID
router.get("/:resource", async (req, res) => {
  try {
    let resource = await Resource.find({ resources: req.params.resource });
    if (!resource) return res.status(404).send("Resource not found");

    res.send(resource);
  } catch (error) {
    console.log("error", error);
  }
});

//Get Resource by ID
router.get("/findbytag/:tag", async (req, res) => {
  try {
    const tag = req.params.tag
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace("-", " ");

    let resource = await Resource.find({ tags: tag });
    if (!resource) return res.status(404).send("Resource not found");

    res.send(resource);
  } catch (error) {
    console.log("error", error);
  }
});

//POSTS
router.post("/", async (req, res) => {
  // const { error } = validate(req.body);
  //If invalid, return 400 - Bad request
  // if (error) return res.status(400).send(error.details[0].message);

  let tags = req.body.tags.split(",");

  tags = tags.map(t => t.trim());

  tags = tags.map(t => t.replace(/\b\w/g, l => l.toUpperCase()));

  resource = new Resource({
    name: req.body.name,

    url: req.body.url,
    type: req.body.type,
    pricing: req.body.pricing,
    appstore: req.body.appstore,
    ioslink: req.body.ioslink,
    gplaylink: req.body.gplaylink,
    upvotes: req.body.upvotes,
    isApproved: req.body.isApproved,
    tags: tags
  });

  try {
    resource = await resource.save();
    res.send(resource);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const resource = await Resource.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );

  if (!resource)
    return res
      .status(404)
      .send("The resource with the given ID was not found.");

  res.send(resource);
});

router.delete("/:id", async (req, res) => {
  const resource = await Resource.findByIdAndRemove(req.params.id);

  if (!resource)
    return res
      .status(404)
      .send("The resource with the given ID was not found.");

  res.send(resource);
});

// //Get Boxes by ID
// router.get("/boxes/:id", async (req, res) => {
//   try {
//     let resource = await Resource.findOne({
//       _id: new ObjectId(req.params.id)
//     });
//     res.send(resource.boxes);
//   } catch (error) {
//     console.log("error", error);
//   }
// });

// //POSTS
// router.post("/", async (req, res) => {
//   const { error } = validate(req.body);
//   //If invalid, return 400 - Bad request
//   if (error) return res.status(400).send(error.details[0].message);

//   resource = new Resource({
//     userid: req.body.userid,
//     fullname: req.body.fullname,
//     rewards: [],
//     redeems: [],
//     boxes: []
//   });

//   try {
//     resource = await resource.save();
//     res.send(resource);
//   } catch (error) {
//     console.log(error);
//     res.status(404).send(error.message);
//   }
// });

// //Refresh Resource
// router.post("/refresh/:id", async (req, res) => {
//   try {
//     resource = await Resource.findOneAndUpdate(
//       { _id: req.params.id },
//       { rewards: [], redeems: [], boxes: [] },
//       { new: true }
//     );

//     //If invalid, return 400 - Bad request
//     if (!resource) return res.status(400).send("Resource does not exist");

//     res.send(resource.rewards);
//   } catch (error) {
//     console.log(error);
//     res.status(404).send(error.message);
//   }
// });

// //Put New Reward
// router.put("/rewards/:id", async (req, res) => {
//   let { error } = validateRewards(req.body);

//   //If invalid, return 400 - Bad request
//   if (error) return res.status(400).send(error.details[0].message);

//   const reward = req.body;

//   try {
//     resource = await Resource.findOneAndUpdate(
//       { _id: req.params.id },
//       { $push: { rewards: reward } },
//       { new: true }
//     );

//     //If invalid, return 400 - Bad request
//     if (!resource) return res.status(400).send("Resource does not exist");

//     res.send(resource.rewards);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });

// //Put New Redeem
// router.put("/redeems/:id", async (req, res) => {
//   let { error } = validateRedeems(req.body);

//   //If invalid, return 400 - Bad request
//   if (error) return res.status(400).send(error.details[0].message);

//   const redeem = req.body;

//   try {
//     resource = await Resource.findOneAndUpdate(
//       { _id: req.params.id },
//       { $push: { redeems: redeem } },
//       { new: true }
//     );

//     //If invalid, return 400 - Bad request
//     if (!resource) return res.status(400).send("Resource does not exist");

//     res.send(resource.redeems);
//   } catch (error) {
//     res.status(404).send(error.message);
//   }
// });

// //Update Boxes
// router.put("/boxes/:id", async (req, res) => {
//   //If invalid, return 400 - Bad request
//   if (!Array.isArray(req.body))
//     return res.status(400).send("Boxes must be an array");

//   const boxes = req.body;

//   try {
//     resource = await Resource.findOneAndUpdate(
//       { _id: req.params.id },
//       { boxes: boxes },
//       { new: true }
//     );

//     //If invalid, return 400 - Bad request
//     if (!resource) return res.status(400).send("Resource does not exist");

//     res.send(resource.boxes);
//   } catch (error) {
//     console.log(error);
//     res.status(404).send(error.message);
//   }
// });

module.exports = router;
