const mongoose = require("mongoose");
const News = require("./models/News"); // Adjust this path based on your project structure

const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/news-app";

const newsData = [
  {
    title: "Breaking News: AI Advances",
    content: "AI is evolving rapidly...",
    archived: false,
    image: "/img/ai-news.jpg",
  },
  {
    title: "SpaceX Launch Successful",
    content: "Another milestone for space exploration...",
    archived: false,
    image: "/img/spacex.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Remove existing data (optional)
    await News.deleteMany({});
    console.log("Existing data cleared");

    // Insert new data
    await News.insertMany(newsData);
    console.log("Database seeded successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
