const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.send("Login API");
});

router.post("/signup", (req, res) => {
  res.send("Sign Up API");
});

router.put("/user", (req, res) => {
  res.send("User State API");
});

module.exports = router;
