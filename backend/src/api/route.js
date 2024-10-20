const express = require("express");
const router = express.Router();

const userStateRoutes = require("./user-state/route");
const dashboardRouets = require("./dashboard/route");

router.use("/api", userStateRoutes);
router.use("/api", dashboardRouets);
module.exports = router;
