const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    team_id: {
      type: Number,
      required: true,
    },
    team_name: {
      type: String,
      required: true,
    },
    win_pct: {
      type: Number,
      required: true,
    },
    fg_pct: {
      type: Number,
      required: true,
    },
    reb: {
      type: Number,
      required: true,
    },
    ast: {
      type: Number,
      required: true,
    },
    tov: {
      type: Number,
      required: true,
    },
    stl: {
      type: Number,
      required: true,
    },
    blk: {
      type: Number,
      required: true,
    },
    plus_minus: {
      type: Number,
      required: true,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Team", teamSchema);
