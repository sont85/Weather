'use strict';
var app = angular.module('Weather');
app.constant('Url', {
  forecast: 'https://api.wunderground.com/api/5ac2a3bc4dece267/forecast10day/q/',
  condition: 'https://api.wunderground.com/api/5ac2a3bc4dece267/conditions/q/'
});
app.service('WeatherService', function($http, Url, DatabaseService, $q){
  var self = this;
  this.forecast = function(search) {
    var deferred = $q.defer();
    $http.get(Url.forecast + search + '.json')
    .success(function(forecast){
      if (forecast.response.error) {
        return;
      }
      self.condition(search)
      .success(function(condition){
        DatabaseService.storeWeather(forecast, condition)
        .then(function(){
          DatabaseService.getWeather()
          .then(function(user){
            deferred.resolve(user);
          }, function() {
            deferred.reject('error');
          })
        });
      }).catch(function(err){
        deferred.reject('error');
        console.log(err);
      });
    }).catch(function(err){
      deferred.reject('error');
      console.log(err);
    });
    return deferred.promise;
  };
  this.condition = function(search) {
    return $http.get(Url.condition + search + '.json');
  };
});
app.service('DatabaseService', function($http, $state, $q) {
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
  this.getWeather = function() {
    var deferred = $q.defer();
    $http.get('/getweather')
    .success(function(user){
      deferred.resolve(user);
    }).catch(function(err){
      deferred.reject('there was an error');
      $state.go('login');
    });
    return deferred.promise;
  };
});
