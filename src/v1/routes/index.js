const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.send(`From ${req.baseUrl}`);
});

module.exports = router;
