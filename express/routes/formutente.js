var express = require('express');
var router = express.Router();

/* GET page of registration of utents. */
router.get('/', function(req, res, next) {
  res.render('formutente');
});

module.exports = router;
