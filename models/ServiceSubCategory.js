const mongoose = require("mongoose");

const serviceSubCategorySchema = new mongoose.Schema(
    {
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceCategory",
            required: true,
        },

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
            type: String,
        },

        // status: {
        //     type: String,
        //     enum: ["active", "inactive"],
        //     default: "active",
        // },
    },
    { timestamps: true }
);

module.exports = mongoose.model("ServiceSubCategory", serviceSubCategorySchema);