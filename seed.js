const { Tag } = require("./models/tag");
const mongoose = require("mongoose");

const tags = [
  {
    name: "Productivity",
    short: "productivity",
    popular: "Y"
  },
  {
    name: "Personal Finance",
    short: "personal-finance",
    popular: "Y"
  },
  {
    name: "Fitness",
    short: "fitness",
    popular: "Y"
  },
  {
    name: "Time Management",
    short: "time-management",
    popular: "Y"
  },
  {
    name: "Goals",
    short: "goals",
    popular: "Y"
  },
  {
    name: "Procrastination",
    short: "procrastination",
    popular: "N"
  },
  {
    name: "Women",
    short: "women",
    popular: "N"
  },
  {
    name: "Men",
    short: "men",
    popular: "N"
  },
  {
    name: "Psychology",
    short: "psychology",
    popular: "N"
  },
  {
    name: "Yoga",
    short: "yoga",
    popular: "N"
  },
  {
    name: "Exercise",
    short: "exercise",
    popular: "N"
  },
  {
    name: "Diet",
    short: "diet",
    popular: "N"
  },
  {
    name: "Men",
    short: "men",
    popular: "N"
  },
  {
    name: "Family",
    short: "family",
    popular: "N"
  },
  {
    name: "Vacations",
    short: "vacations",
    popular: "N"
  },
  {
    name: "Communication",
    short: "communication",
    popular: "N"
  },
  {
    name: "Public Speaking",
    short: "public-speaking",
    popular: "Y"
  },
  {
    name: "Health",
    short: "health",
    popular: "N"
  },
  {
    name: "Negotation",
    short: "negotation",
    popular: "N"
  }
];

async function seed() {
  mongoose
    .connect("mongodb://localhost/upstacks", { useNewUrlParser: true })
    .then(() => Tag.insertMany(tags))
    .catch(err => console.error("Could not connect", err));

  //   mongoose.disconnect();
  console.info("Done!");
}

seed();
