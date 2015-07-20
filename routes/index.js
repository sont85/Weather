'use strict';
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/userSchema');

router.post('/storeweather', function(req, res){
  User.findOne({ email: req.user.email }, function(err, user) {
    user.forecast.push(req.body.forecast);
    user.condition.push(req.body.condition);
    if (user.forecast.length > 3) {
      user.forecast.$shift();
      user.condition.$shift();
    }
    user.save();
    res.json(user);
  });
});
router.get('/getweather', function(req, res) {
  User.findOne({ email: req.user.email }, function(err, user) {
    res.json(user);
  });
});


module.exports = router;
