const express = require("express");
const router = express.Router();

const { getTeams, getTeamPlayers } = require("../controllers/teamController");

// GET all teams
router.get("/", getTeams);

// GET all players froma  certain team
router.get("/:team_id/players", getTeamPlayers);

module.exports = router;
