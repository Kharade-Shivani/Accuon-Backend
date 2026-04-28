const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: true,
            trim: true,
        },
        department: {
            type: String,
            required: true,
        },
        experience: {
            type: String, // example: "2-5 Years"
            required: true,
        },
        salary: {
            type: String, // example: "₹3-6 LPA"
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);