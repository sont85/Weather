'use strict';
var app = angular.module('Weather');
app.constant('Url', {
  forecast: 'https://api.wunderground.com/api/5ac2a3bc4dece267/forecast10day/q/',
  condition: 'https://api.wunderground.com/api/5ac2a3bc4dece267/conditions/q/'
});
app.service('WeatherService', function($http, Url, DatabaseService){
  var self = this;
  this.forecast = function($scope) {
    $http.get(Url.forecast + $scope.search + '.json')
    .success(function(forecast){
      if (forecast.response.error) {
        return;
      }
      self.condition($scope.search)
      .success(function(condition){
        DatabaseService.storeWeather(forecast, condition)
        .then(function(){
          DatabaseService.getWeather($scope);
        });
      }).catch(function(err){
        console.log(err);
      });
    }).catch(function(err){
      console.log(err);
    });
  };
  this.condition = function(search) {
    return $http.get(Url.condition + search + '.json');
  };
});
app.service('DatabaseService', function($http, $state) {
  var self = this;
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
    return $http.post('/storeweather', data);
  };
  this.getWeather = function($scope) {
    $http.get('/getweather')
    .success(function(user){
      $scope.forecastsData = user.forecast;
      $scope.conditionsData = user.condition;
    }).catch(function(err){
      $state.go('login');
    });
  };
});
