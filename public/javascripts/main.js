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
      controller: 'MainCtrl'
    });
});
app.service('WeatherService', function($http){
  this.forecast = function(search) {
    return $http.get('http://api.wunderground.com/api/5ac2a3bc4dece267/forecast10day/q/' + search + '.json');
  };
});

app.service('DatabaseService', function($http) {
  this.storeForecast = function() {
    return $http.get('/store-forecast');
  };
});
app.controller('MainCtrl', function($scope, WeatherService, DatabaseService) {
  $scope.submitSearch = function() {
    WeatherService.forecast($scope.search)
    .success(function(data){
      console.log(data);
      DatabaseService.storeForecast()
      .success(function (response) {
        console.log(response);
        console.log('received response from database');
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
