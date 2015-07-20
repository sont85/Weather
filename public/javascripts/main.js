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
    console.log($scope.newUser);
    DatabaseService.registerUser($scope.newUser);
    $scope.newUser = '';
  };
  $scope.loginUser = function() {
    DatabaseService.loginUser($scope.login);
  };
});
app.controller('MainCtrl', function($scope, WeatherService, DatabaseService, $state) {
  DatabaseService.getWeather()
  .success(function(user){
    $scope.$apply(function(){
      $scope.forecastsData = user.forecast;
      $scope.conditionsData = user.condition;
    });

    console.log(user);
  }).catch(function(err){
    console.log(err);
  });
  $scope.submitSearch = function() {
    WeatherService.forecast($scope.search)
    .success(function(forecast){
      WeatherService.condition($scope.search)
      .success(function(condition){
        DatabaseService.storeWeather(forecast, condition);
        // $state.reload();
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
