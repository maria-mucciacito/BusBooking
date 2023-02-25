var express = require("express");
var router = express.Router();
var dbPool = require("./db");
var db = dbPool.getPool();

/* GET page of posti*/
router.get("/:id", function (req, res) {
  var id = parseInt(req.params.id);
  db.query("SELECT * FROM posto WHERE bus=$1;", [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.send(results.rows)
    }
  });
});

module.exports = router;
