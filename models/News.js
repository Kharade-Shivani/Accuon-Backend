const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String, // optional
        },
        video: {
            type: String, // optional
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);