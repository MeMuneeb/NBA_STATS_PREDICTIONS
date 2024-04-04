const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const playerSchema = new Schema(
  {
    player_name: {
      type: String,
      required: true,
    },
    player_id: {
      type: Number,
      required: true,
    },
    team_id: {
      type: Number,
      required: true,
    },
    team_abbreviation: {
      type: String,
      required: true,
    },
    pts: {
      type: Number,
      required: true,
    },
    w_pct: {
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

module.exports = mongoose.model("Player", playerSchema);
