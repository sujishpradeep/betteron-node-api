const { Resource } = require("../models/resource");
const mongoose = require("mongoose");
const resources = require("./resources.json");
async function seed() {
  mongoose
    .connect("mongodb://localhost/upstacks", { useNewUrlParser: true })
    .then(() => Resource.insertMany(resources))
    .catch(err => console.error("Could not connect", err));

  //   mongoose.disconnect();
  console.info("Done!");
}

resources.map(r => (r.upvotes = 0));
resources.map(r => (r.isApproved = "Y"));
resources.map(
  r =>
    (r.tags = r.tags
      .split(",")
      .map(t => t.trim().replace(/\b\w/g, l => l.toUpperCase())))
);

// let tags = req.body.tags.split(",");

//   tags = tags.map(t => t.trim());

//   tags = tags.map(t => t.replace(/\b\w/g, l => l.toUpperCase()));

console.log(resources[0]);
seed();
