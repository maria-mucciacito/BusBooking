var express = require("express");
var router = express.Router();
var dbPool = require('./db');
var db = dbPool.getPool();

/* GET home page. */
router.get("/", function (req, res, next) {
  db.query("SELECT DISTINCT partenza ,arrivo  FROM tratta;", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render("index", { data: results.rows });
    }
  });
});

module.exports = router;
