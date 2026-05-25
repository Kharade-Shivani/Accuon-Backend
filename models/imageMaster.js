const mongoose = require("mongoose");

const imageMasterSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    imageTitle: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ImageMaster", imageMasterSchema);