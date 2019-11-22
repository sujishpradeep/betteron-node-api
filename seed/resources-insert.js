const { Resource } = require("../models/resource");
const mongoose = require("mongoose");

const resources = [
  {
    name: "Think And Grow Rich",
    url: "https://www.goodreads.com/book/show/30186948-think-and-grow-rich",
    type: "Book",
    pricing: "Paid",
    appstore: "",
    upvotes: 34,
    tags: ["personal-finance", "goals", "investing", "money"],
    isApproved: "Y"
  },
  {
    name: "Money Manager",
    url: "https://www.moneymanagerex.org",
    type: "Book",
    pricing: "Paid",
    appstore: "B",
    upvotes: 34,
    tags: ["personal-finance", "budget", "expense", "money"],
    ioslink: ["personal-finance", "budget", "expense", "money"],
    gplaylink:
      "https://play.google.com/store/apps/details?id=com.realbyteapps.moneymanagerfree&hl=en_AU",
    ioslink:
      "https://apps.apple.com/au/app/money-manager-budget-expense/id560481810",
    isApproved: "Y"
  }
];

async function seed() {
  mongoose
    .connect("mongodb://localhost/upstacks", { useNewUrlParser: true })
    .then(() => Resource.insertMany(resources))
    .catch(err => console.error("Could not connect", err));

  //   mongoose.disconnect();
  console.info("Done!");
}

seed();
