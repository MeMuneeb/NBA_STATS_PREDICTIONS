const express = require("express");
const router = express.Router();

const { getAllPlayers, getOnePlayer } = require("../controllers/playerController");

// GET all players
router.get("/", getAllPlayers);

// GET one player
router.get("/:player_id", getOnePlayer);

module.exports = router;
