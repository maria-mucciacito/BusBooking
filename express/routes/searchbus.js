var express = require("express");
var router = express.Router();
var dbPool = require("./db");
var db = dbPool.getPool();

/* GET page of results of search bus. */
router.post("/",function (req, res) {
  const {partenza,arrivo,data} = req.body
  db.query(
    "SELECT *, to_char(data, 'dd.mm.YYYY') FROM tratta WHERE arrivo=$1 AND partenza=$2 AND data=$3",
    [arrivo, partenza, data],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        console.log(results.rows)
        res.send(results.rows)

      }
    }
  );
});

module.exports = router;
