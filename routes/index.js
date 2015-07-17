var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Weather = require('../models/weatherSchema');
//
mongoose.connect('mongodb://localhost/weather');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weather App' });
});
router.get('/store-forecast', function(req, res){
  

});

module.exports = router;
