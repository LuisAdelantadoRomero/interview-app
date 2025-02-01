const express = require("express");
const News = require("../models/News");

const router = express.Router();

// Get all news (filtering out archived by default)
router.get("/", async (req, res) => {
    console.log('get all news');
    try {
        const news = await News.find({ archived: false });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: "Error fetching news" });
    }
});

// Get archived news
router.get("/archived", async (req, res) => {
    try {
        const archivedNews = await News.find({ archived: true });
        res.json(archivedNews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching archived news" });
    }
});

// Archive a news item by title
router.put("/archived/:title", async (req, res) => {
    console.log('Archiving news');
    const title = decodeURIComponent(req.params.title); // Decode the title
    console.log('Title to archive:', title);
    
    try {
        // Use Mongoose's findOneAndUpdate to find the news by title and update the 'archived' field
        const updatedNews = await News.findOneAndUpdate(
            { title: title },   // Search for the news item by title
            { archived: true },  // Set the 'archived' field to true
            { new: true }        // Return the updated document
        );

        if (!updatedNews) {
            return res.status(404).json({ message: "News item not found" });
        }

        // Send back the updated news item
        res.json(updatedNews);
    } catch (error) {
        console.error('Error archiving news:', error);
        res.status(400).json({ message: "Error archiving news" });
    }
});

router.delete('/deleteNew/:title', async (req, res) => {
    const { title } = req.params;
  
    try {
      const result = await News.deleteOne({ title });
  
      if (result.deletedCount === 0) {
        return res.status(404).send('News not found');
      }
  
      res.status(200).send('News deleted successfully');
    } catch (error) {
      res.status(500).send('Error deleting news');
    }
});
  

module.exports = router;

