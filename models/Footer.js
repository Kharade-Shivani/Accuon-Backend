const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema(
    {
        phone: [
            {
                type: String,
                required: true,
            },
        ],
        email: [
            {
                type: String,
                required: true,
            },
        ],
        address: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// ⚠️ remove space if possible (recommended)
module.exports = mongoose.model("Accuon_footer", footerSchema);