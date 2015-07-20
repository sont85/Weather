'use strict';
var app = angular.module('Weather');
app.constant('Url', {
  forecast: 'https://api.wunderground.com/api/5ac2a3bc4dece267/forecast10day/q/',
  condition: 'https://api.wunderground.com/api/5ac2a3bc4dece267/conditions/q/'
});
app.service('WeatherService', function($http, Url){
  this.forecast = function(search) {
    return $http.get(Url.forecast + search + '.json');
  };
  this.condition = function(search) {
    return $http.get(Url.condition + search + '.json');
  };
});
app.service('DatabaseService', function($http, $state) {
  var self = this
  this.loginUser = function(loginUser) {
    $http.post('/login', loginUser)
    .success(function(response){
      console.log(response);
      $state.go('forecast');
    })
    .catch(function(err){
      console.log(err);
    });
  };
  this.registerUser = function(newUser) {
    $http.post('/register', newUser)
    .success(function(data) {
      console.log(data);
    })
    .catch(function(err){
      console.log(err);
    });
  };
  this.storeWeather = function(forecast, condition) {
    var data = {};
    data.forecast = forecast;
    data.condition = condition;
    var returnData;
    $http.post('/storeweather', data)
    .success(function(userData){
      console.log("===============");
      console.log(userData);
      returnData = userData;
    });
    return returnData;
  };
  this.getWeather = function(forecastData) {
    return $http.get('/getweather');
  };
});
