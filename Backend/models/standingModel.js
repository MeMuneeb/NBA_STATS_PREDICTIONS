const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const standingSchema = new Schema(
  {
    team_id: {
      type: Number,
      required: true,
    },
    team_name: {
      type: String,
      required: true,
    },
    conference: {
      type: String,
      required: true,
    },
    win_pct: {
      type: Number,
      required: true,
    },
    conference_record: {
      type: String,
      required: true,
    },
    gb: {
      type: Number,
      required: true,
    },
    home: {
      type: String,
      required: true,
    },
    road: {
      type: String,
      required: true,
    },
    last10: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Standing", standingSchema);
