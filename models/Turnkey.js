const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    title: String,
    description: String,
    subPoints: [String],
});

const turnkeySchema = new mongoose.Schema(
    {
        image: String,
        description: String,
        sections: [sectionSchema], // 3 sections
    },
    { timestamps: true }
);

module.exports = mongoose.model("Turnkey", turnkeySchema);