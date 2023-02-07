var express = require("express");
var router = express.Router();
var dbPool = require('./db');
var db = dbPool.getPool();

/* GET home page. */
router.get("/", function (req, res) {
    res.render("confermaprenotazione");
});

module.exports = router;
