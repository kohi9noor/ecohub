const express = require("express");
const router = express.Router();

router.get("/collect", (req, res) => {
  res.send("Collect Waste Data");
});

router.post("/mark-collected", (req, res) => {
  res.send("Waste Marked as Collected");
});

module.exports = router;
