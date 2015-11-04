var express = require('express');
// var GoogleMapsLoader = require('google-maps');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Barhoppr' });
});

module.exports = router;
