const mongoose = require("mongoose");

const statMasterSchema = new mongoose.Schema(
  {
    title: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StatMaster", statMasterSchema);