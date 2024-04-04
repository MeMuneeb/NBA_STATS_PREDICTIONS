const express = require("express");
const router = express.Router();

const { getAllPlayers } = require("../controllers/playerController");

// GET all players
router.get("/", getAllPlayers);

module.exports = router;
