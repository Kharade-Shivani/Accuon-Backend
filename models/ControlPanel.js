const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    subTitle: String,
    subDescription: String,
    subPoints: [String],
});

const sectionSchema = new mongoose.Schema({
    title: String,
    description: String,
    subSections: [subSectionSchema],
});

const controlPanelSchema = new mongoose.Schema(
    {
        image: String,
        description: String,
        sections: [sectionSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("ControlPanel", controlPanelSchema);