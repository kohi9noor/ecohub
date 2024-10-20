const express = require("express");
const cors = require("cors");
const cookieSession = require("");
async function serverup() {
  const app = express();

  app.use(cors());

  app.listen(4400, () => {
    console.log("Server: http://localhost:4400/");
  });
}

module.exports = serverup;
