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
  .then(function(user){
    console.log('user', user);
    $scope.forecastsData = user.data.forecast;
    $scope.conditionsData = user.data.condition;
    $scope.$evalAsync();

    console.log('test', $scope.forecastsData);
  }).catch(function(err){
    console.log(err);
  });
  $scope.submitSearch = function() {
    WeatherService.forecast($scope.search)
    .success(function(forecast){
      console.log('wooopeeeee', forecast);
      if (forecast.response.error !== null) {
        return;
      }
      WeatherService.condition($scope.search)
      .success(function(condition){
        DatabaseService.storeWeather(forecast, condition)
        .then(function(){
          DatabaseService.getWeather()
          .then(function(response){
            $scope.conditionsData = response.data.condition;
            $scope.forecastsData = response.data.forecast;
            // $scope.evalAsync();
          });
        });
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
