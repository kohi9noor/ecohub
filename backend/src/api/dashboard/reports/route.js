const express = require("express");
const router = express.Router();

router.post("/submit", (req, res) => {
  res.send("Waste Issue Report Submitted");
});

router.get("/all", (req, res) => {
  res.send("All Waste Issue Reports");
});

module.exports = router;
