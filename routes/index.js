'use strict';
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
router.post('/register', function(req, res){
  console.log(req.body);
  Weather.find({}, function(err, response) {
    var newUser = {
      email: req.body.email,
      password: req.body.password
    };
    newUser.save();
    res.json(newUser);
  });
});
router.post('/store-forecast', function(req, res){

});


module.exports = router;
