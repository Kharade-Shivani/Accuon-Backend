const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("AboutUs Accuon", aboutUsSchema);