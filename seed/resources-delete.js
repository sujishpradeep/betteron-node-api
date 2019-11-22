const { Resource } = require("../models/resource");
const mongoose = require("mongoose");

const resources = { name: { $gte: "" } };

async function seed() {
  mongoose
    .connect("mongodb://localhost/upstacks", { useNewUrlParser: true })
    .then(() => Resource.deleteMany(resources))
    .catch(err => console.error("Could not connect", err));

  //   mongoose.disconnect();
  console.info("Done!");
}

seed();
