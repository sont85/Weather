'use strict';
var app = angular.module('Weather');
app.service('WeatherService', function($http){
  this.forecast = function(search) {
    return $http.get('http://api.wunderground.com/api/5ac2a3bc4dece267/forecast10day/q/' + search + '.json');
  };
  this.condition = function(search) {
    return $http.get('http://api.wunderground.com/api/5ac2a3bc4dece267/conditions/q/' + search + '.json');
  };
});
app.service('DatabaseService', function($http, $state) {
  this.userData = null;
  this.loginUser = function(loginUser) {
    $http.post('/login', loginUser)
    .success(function(response){
      console.log(response);
      $state.go('search');
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
  this.storeForecast = function(forecast, condition) {
    var data = {};
    data.forecast = forecast;
    data.condition = condition;
    $http.post('/store-forecast', data)
      .success(function(userData){
        console.log(userData);
      }).catch(function(err){
        $state.go('forecast');
        console.log(err);
      });
  };
  this.getForecast = function(forecastData) {
    return $http.get('get-forecast');
  };
});