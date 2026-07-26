const express = require("express");
const router = express.Router();

const apiStatsController = require("../../controllers/api/apiStatsController");

router.get("/", apiStatsController.stats);

module.exports = router;