const Team = require("../models/teamModel");
const Player = require("../models/playerModel");
const mongoose = require("mongoose");

// get all teams
const getTeams = async (req, res) => {
  try {
    const teams = await Team.find({});
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).send("Failed to fetch teams: " + error.message);
  }
};

// get players of certain team
const getTeamPlayers = async (req, res) => {
  try {
    const { team_id } = req.params;
    const players = await Player.find({ team_id });
    const team = await Team.find({ team_id });
    res.status(200).json({ team: team, players: players });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTeams,
  getTeamPlayers,
};

