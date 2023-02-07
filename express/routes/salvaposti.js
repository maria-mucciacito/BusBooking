var express = require('express');
var router = express.Router();
var dbPool = require('./db');
var db = dbPool.getPool();

router.post('/', function(req, res) {
    (req,res)=>{
        const {bus, tratta, posti } = req.body
    };
});

module.exports = router;
