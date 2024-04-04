const Player = require("../models/playerModel");
const mongoose = require("mongoose");

// get all players
const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find({});
    res.status(200).json(players);
  } catch (error) {
    res.status(500).send("Failed to fetch players: " + error.message);
  }
};

const getOnePlayer = async (req, res) => {
  try {
    const { player_id } = req.params;
    const player = await Player.find({ player_id });
    res.status(200).json(player);
  } catch (error) {
    res.status(500).send("Failed to fetch player: " + error.message);
  }
};

module.exports = {
  getAllPlayers,
  getOnePlayer,
};
