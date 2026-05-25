const mongoose = require("mongoose");

const whyChooseUsMasterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "WhyChooseUsMaster",
  whyChooseUsMasterSchema
);