const express = require("express");
const router = express.Router();

const { getTeams, getOneTeam, getTeamPlayers } = require("../controllers/teamController");

// GET all teams
router.get("/", getTeams);

// GET all players from a  certain team
router.get("/:team_id", getTeamPlayers);

// // GET one team
// router.get("/:team_id", getOneTeam);

module.exports = router;
