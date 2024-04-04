const express = require("express");
const router = express.Router();
const { getPrediction } = require("../controllers/predictionController");

// POST teams for prediction and get result
router.post("/", getPrediction);

module.exports = router;
