const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    title: String,
    description: String,
    subPoints: [String],
});

const engineeringSchema = new mongoose.Schema(
    {
        image: String,
        description: String,
        sections: [sectionSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Engineering", engineeringSchema);