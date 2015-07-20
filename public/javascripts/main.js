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
    .success(function(forecast){
      WeatherService.condition($scope.search)
      .success(function(condition){
        DatabaseService.storeForecast(forecast, condition);
      })
      .catch(function(err){
        console.log(err);
      });
    })
    .catch(function(err){
      console.log(err);
    });
  };
});
app.controller('ForecastCtrl', function($scope, WeatherService, DatabaseService, $state) {
  // DatabaseService.getForecast()
  // .success(function(user){
  //   DatabaseService.userData = user;
  //   // $scope.forecastday = user.search[0].forecast.simpleforecast.forecastday;
  //   $scope.forecastData = user.search;
  //   console.log(user.search[0].forecast.simpleforecast.forecastday);
  // }).catch(function(err){
  //   console.log(err);
  // });
});
