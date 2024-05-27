const Standing = require("../models/standingModel");
const mongoose = require("mongoose");

// get all standings
const getStandings = async (req, res) => {
  try {
    const standings = await Standing.find({});
    res.status(200).json(standings);
  } catch (error) {
    res.status(500).send("Failed to fetch standings: " + error.message);
  }
};

module.exports = {
  getStandings,
};
