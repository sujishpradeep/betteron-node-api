const { Tag } = require("../models/tag");
const mongoose = require("mongoose");

const tags = { popular: { $gte: "" } };

async function seed() {
  mongoose
    .connect("mongodb://localhost/upstacks", { useNewUrlParser: true })
    .then(() => Tag.deleteMany(tags))
    .catch(err => console.error("Could not connect", err));

  //   mongoose.disconnect();
  console.info("Done!");
}

seed();
