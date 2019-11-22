const { Resource } = require("../models/resource");
const mongoose = require("mongoose");

async function seed() {
  const input = "money";
  console.log("input", input);
  mongoose
    .connect("mongodb://localhost/upstacks", { useNewUrlParser: true })
    .then(() => console.log(Resource.find({ tags: input })))
    .catch(err => console.error("Could not connect", err));

  //   mongoose.disconnect();
  console.info("Done!");
}

seed();
