'use strict';
var app = angular.module('Weather', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: '../html/login.html',
      controller: 'MainCtrl'
    })
    .state('search', {
      url: '/search',
      templateUrl:'../html/search.html',
      controller: 'MainCtrl'
    })
    .state('forecast', {
      url: '/forecast',
      templateUrl:'../html/forecast.html',
      controller: 'ForecastCtrl'
    });
});
app.service('WeatherService', function($http){
  this.forecast = function(search) {
    return $http.get('http://api.wunderground.com/api/5ac2a3bc4dece267/forecast10day/q/' + search + '.json');
  };
});
app.service('DatabaseService', function($http, $state) {
  this.forecastData = null;
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
  this.storeForecast = function(forecastData) {
    return $http.post('/store-forecast', forecastData);
  };
  this.getForecast = function(forecastData) {
    return $http.get('get-forecast');
  };
});
app.controller('MainCtrl', function($scope, WeatherService, DatabaseService, $state) {
  $scope.registerUser = function() {
    console.log($scope.newUser);
    DatabaseService.registerUser($scope.newUser);
    $scope.newUser = '';
  };
  $scope.loginUser = function() {
    DatabaseService.loginUser($scope.login);
  };
  $scope.submitSearch = function() {
    WeatherService.forecast($scope.search)
    .success(function(forecastData){
      console.log('weatherdata:', forecastData);
      DatabaseService.storeForecast(forecastData)
      .success(function (response) {
        console.log('store data:',response);
        $state.go('forecast');
      })
      .catch(function(err){
        console.log(err);
      });
    })
    .error(function(err){
      console.log(err);
    });
  };
});
app.controller('ForecastCtrl', function($scope, WeatherService, DatabaseService, $state) {
  DatabaseService.getForecast()
  .success(function(data){
    DatabaseService.forecastData = data;
  }).catch(function(err){
    console.log(err);
  });
});
