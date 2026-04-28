const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            required: true,
        },
        client_name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Accuon_Testimonial", testimonialSchema);