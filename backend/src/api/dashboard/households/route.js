const express = require("express");

const router = express.Router();

router.get("/households", (req, res) => {
  res.send("Household Dashboard Data");
});

router.post("/schedule-pickup", (req, res) => {
  res.send("Pickup Scheduled for Household");
});

module.exports = router;
