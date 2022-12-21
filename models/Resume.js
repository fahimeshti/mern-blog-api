const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    updateCount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", ResumeSchema);
