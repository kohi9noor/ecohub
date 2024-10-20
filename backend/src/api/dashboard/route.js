const express = require("express");
const router = express.Router();

const collectRoutes = require("./collect/route");
const householdsRoutes = require("./households/route");
const reportsRoutes = require("./reports/route");

router.use("/dashboard", collectRoutes);
router.use("/dashboard", householdsRoutes);
router.use("/dashboard", reportsRoutes);

module.exports = router;
