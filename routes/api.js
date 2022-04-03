const express = require("express");

const router = express.Router();

const controller = require("../controller");

// listen to all post methods under api route
router.post("/*", (req, res) => {
  /*
  Find specific method called by client,
  For example, if client call /api/setLog, method will be setLog
  */
  const paths = req.path.split("/");
  const method = paths[1];

  controller[method]({ body: req.body, req, res });
});

// listen to all get methods under api route
router.get("/*", (req, res) => {
  /*
  Find specific method called by client,
  For example, if client call /api/getLogs, method will be getLogs
  */
  const paths = req.path.split("/");
  const method = paths[1];

  controller[method]({ body: req.query, req, res });
});

module.exports = router;
