'use strict';
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/userSchema');

router.post('/store-forecast', function(req, res){
  console.log(req.user);
  console.log(req.body);
  User.findOne({email: req.user.email}, function(err, user){
    if (err){
      res.send(err);
    }
    if (!user) {
      res.status(404);
    }
    user.search.push(req.body);
    if (user.search.push.length > 3) {
      console.log("greater than 3");
      user.search.splice(0, 1);
    }
    user.save();
    res.json(user);
  });

  // var weather = new Weather(req.body);
  // weather.save(function(err, saved){
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log('saved:', saved);
  //   res.json(saved);
  // });
});
router.get('/get-forecast', function() {
  User.findOne({email:req.user.email}), function(err, user) {
    if (err) {
      res.send(err);
    }
    if (!user) {
      res.status(404);
    }
    
  }
});


module.exports = router;
