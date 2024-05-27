const express = require("express");
const router = express.Router();

const { getStandings } = require("../controllers/standingController");

// GET standings
router.get("/", getStandings);

module.exports = router;
