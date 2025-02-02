const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String },
    date: { type: Date, default: Date.now },
    archived: { type: Boolean, default: false },
    archiveDate: { type: Date },
    image: { type: String, required: true }
});

module.exports = mongoose.model("News", newsSchema);

