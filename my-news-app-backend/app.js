const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const newsRoutes = require("./routes/newsRoutes");
const router = express.Router();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(router);

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/news", newsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
