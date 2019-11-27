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
console.log(resources[0]);
seed();
