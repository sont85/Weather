'use strict';
var app = angular.module('Weather', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('login', {
      url: '/',
      templateUrl: '../html/login.html',
      controller: 'LoginCtrl'
    })
    .state('forecast', {
      url: '/forecast',
      templateUrl:'../html/forecast.html',
      controller: 'MainCtrl'
    });
});
app.controller('LoginCtrl', function($scope, DatabaseService, $state) {
  $scope.registerUser = function() {
    DatabaseService.registerUser($scope.newUser);
    $scope.newUser = '';
    $('#registerModal').modal('hide');
  };
  $scope.loginUser = function() {
    DatabaseService.loginUser($scope.login);
  };
});
app.controller('MainCtrl', function($scope, WeatherService, DatabaseService, $state) {
  $scope.submitSearch = function() {
    WeatherService.forecast($scope.search)
    .then(function(user) {
      $scope.forecastsData = user.forecast;
      $scope.conditionsData = user.condition;
    }, function() {
      alert('err');
    })
  };
  DatabaseService.getWeather()
    .then(function(user) {
      console.log('success')
      $scope.forecastsData = user.forecast;
      $scope.conditionsData = user.condition;
    }, function(err) {
      alert(err);
    });

});
