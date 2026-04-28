const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        contact: { type: String, required: true, trim: true },

        position: { type: String, required: true, trim: true },

        employment: { type: String, required: true, trim: true },

        availabilityDate: { type: Date, required: true },

        resume: { type: String }, // Cloudinary URL

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);