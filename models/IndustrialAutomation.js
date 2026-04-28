const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    title: String,
    subPoints: [String],
});

const industrialSchema = new mongoose.Schema(
    {
        image: String,
        description: String,
        sections: [sectionSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("IndustrialAutomation", industrialSchema);