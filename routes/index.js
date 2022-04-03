const express = require("express");

const router = express.Router();

router.get(/\/(.)*/, async (req, res) => {
  res.render("index", {
    title: "Time Logger",
  });
});

module.exports = router;
